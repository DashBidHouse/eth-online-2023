// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.16;

import '@uma/core/contracts/optimistic-oracle-v3/implementation/ClaimData.sol';
import '@uma/core/contracts/optimistic-oracle-v3/interfaces/OptimisticOracleV3Interface.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

// This WorkContract contract enables for the issuance of a single unlimited time work contract per event/payout recipient There is
// no limit to the number of payout requests that can be made of the same work contract; however, only the first asserted
// request will settle the work contract payment, whereas OOv3 will settle bonds for all requestors.
contract WorkContract {
  using SafeERC20 for IERC20;
  IERC20 public immutable defaultCurrency;
  OptimisticOracleV3Interface public immutable oo;
  uint64 public constant assertionLiveness = 7200;
  bytes32 public immutable defaultIdentifier;

  struct WorkContract {
    uint256 paymentAmount;
    address payoutAddress;
    uint256 deadline;
    bytes workSubmission;
    bool settled;
  }

  mapping(bytes32 => bytes32) public assertedWorkContracts;

  mapping(bytes32 => WorkContract) public workContracts;

  event WorkContractIssued(
    bytes32 indexed workContractId,
    bytes workSubmission,
    uint256 paymentAmount,
    uint256 deadline,
    address indexed payoutAddress
  );

  event WorkContractPayoutRequested(bytes32 indexed workContractId, bytes32 indexed assertionId);

  event WorkContractPayoutSettled(bytes32 indexed workContractId, bytes32 indexed assertionId);

  constructor(address _defaultCurrency, address _optimisticOracleV3) {
    defaultCurrency = IERC20(_defaultCurrency);
    oo = OptimisticOracleV3Interface(_optimisticOracleV3);
    defaultIdentifier = oo.defaultIdentifier();
  }

  function issueWorkContract(
    uint256 paymentAmount,
    address payoutAddress,
    uint256 deadline,
    bytes memory workSubmission
  ) public returns (bytes32 workContractId) {
    workContractId = keccak256(abi.encode(workSubmission, payoutAddress));
    require(workContracts[workContractId].payoutAddress == address(0), 'WorkContract already exists');
    workContracts[workContractId] = WorkContract({
      paymentAmount: paymentAmount,
      payoutAddress: payoutAddress,
      deadline: deadline,
      workSubmission: workSubmission,
      settled: false
    });
    defaultCurrency.safeTransferFrom(msg.sender, address(this), paymentAmount);
    emit WorkContractIssued(workContractId, workSubmission, paymentAmount, payoutAddress);
  }

  function requestPayout(bytes32 workContractId) public returns (bytes32 assertionId) {
    require(workContracts[workContractId].payoutAddress != address(0), 'WorkContract does not exist');
    require(workContracts[workContractId].deadline < block.timestamp, 'Sbumission Time is not over');
    uint256 bond = oo.getMinimumBond(address(defaultCurrency));
    defaultCurrency.safeTransferFrom(msg.sender, address(this), bond);
    defaultCurrency.safeApprove(address(oo), bond);
    assertionId = oo.assertTruth(
      abi.encodePacked(
        'WorkContract contract is claiming that work has been submitted',
        workContracts[workContractId].workSubmission,
        ' had occurred as of ',
        ClaimData.toUtf8BytesUint(block.timestamp),
        '.'
      ),
      msg.sender,
      address(this),
      address(0), // No sovereign security.
      assertionLiveness,
      defaultCurrency,
      bond,
      defaultIdentifier,
      bytes32(0) // No domain.
    );
    assertedWorkContracts[assertionId] = workContractId;
    emit WorkContractPayoutRequested(workContractId, assertionId);
  }

  function assertionResolvedCallback(bytes32 assertionId, bool assertedTruthfully) public {
    require(msg.sender == address(oo));
    // If the assertion was true, then the work contract is settled.
    if (assertedTruthfully) {
      _settlePayout(assertionId);
    }
  }

  function assertionDisputedCallback(bytes32 assertionId) public {}

  function _settlePayout(bytes32 assertionId) internal {
    // If already settled, do nothing. We don't revert because this function is called by the
    // OptimisticOracleV3, which may block the assertion resolution.
    bytes32 workContractId = assertedWorkContracts[assertionId];
    WorkContract storage workContract = workContracts[workContractId];
    if (workContract.settled) return;
    workContract.settled = true;
    defaultCurrency.safeTransfer(workContract.payoutAddress, workContract.paymentAmount);
    emit WorkContractPayoutSettled(workContractId, assertionId);
  }
}
