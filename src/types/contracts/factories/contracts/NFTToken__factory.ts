/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { NFTToken, NFTTokenInterface } from "../../contracts/NFTToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "mintedTokenCount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620035fc380380620035fc8339818101604052810190620000379190620002bc565b6040518060400160405280601381526020017f576f6f64656e20536f6c6469657273204e4654000000000000000000000000008152506040518060400160405280600381526020017f57535400000000000000000000000000000000000000000000000000000000008152508160009080519060200190620000bb929190620001cc565b508060019080519060200190620000d4929190620001cc565b505050620000f7620000eb620000fe60201b60201c565b6200010660201b60201c565b5062000353565b600033905090565b6000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b828054620001da906200031d565b90600052602060002090601f016020900481019282620001fe57600085556200024a565b82601f106200021957805160ff19168380011785556200024a565b828001600101855582156200024a579182015b82811115620002495782518255916020019190600101906200022c565b5b5090506200025991906200025d565b5090565b5b80821115620002785760008160009055506001016200025e565b5090565b600080fd5b6000819050919050565b620002968162000281565b8114620002a257600080fd5b50565b600081519050620002b6816200028b565b92915050565b600060208284031215620002d557620002d46200027c565b5b6000620002e584828501620002a5565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200033657607f821691505b602082108114156200034d576200034c620002ee565b5b50919050565b61329980620003636000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c80636352211e116100ad578063a22cb46511610071578063a22cb46514610343578063b88d4fde1461035f578063c87b56dd1461037b578063e985e9c5146103ab578063f2fde38b146103db5761012c565b80636352211e1461029d57806370a08231146102cd578063715018a6146102fd5780638da5cb5b1461030757806395d89b41146103255761012c565b806323b872dd116100f457806323b872dd146101e95780632f745c591461020557806340d097c31461023557806342842e0e146102515780634f6ccce71461026d5761012c565b806301ffc9a71461013157806306fdde0314610161578063081812fc1461017f578063095ea7b3146101af57806318160ddd146101cb575b600080fd5b61014b6004803603810190610146919061216d565b6103f7565b60405161015891906121b5565b60405180910390f35b610169610409565b6040516101769190612269565b60405180910390f35b610199600480360381019061019491906122c1565b61049b565b6040516101a6919061232f565b60405180910390f35b6101c960048036038101906101c49190612376565b6104e1565b005b6101d36105f9565b6040516101e091906123c5565b60405180910390f35b61020360048036038101906101fe91906123e0565b610606565b005b61021f600480360381019061021a9190612376565b610666565b60405161022c91906123c5565b60405180910390f35b61024f600480360381019061024a9190612433565b61070b565b005b61026b600480360381019061026691906123e0565b610739565b005b610287600480360381019061028291906122c1565b610759565b60405161029491906123c5565b60405180910390f35b6102b760048036038101906102b291906122c1565b6107ca565b6040516102c4919061232f565b60405180910390f35b6102e760048036038101906102e29190612433565b610851565b6040516102f491906123c5565b60405180910390f35b610305610909565b005b61030f61091d565b60405161031c919061232f565b60405180910390f35b61032d610947565b60405161033a9190612269565b60405180910390f35b61035d6004803603810190610358919061248c565b6109d9565b005b61037960048036038101906103749190612601565b6109ef565b005b610395600480360381019061039091906122c1565b610a51565b6040516103a29190612269565b60405180910390f35b6103c560048036038101906103c09190612684565b610ab9565b6040516103d291906121b5565b60405180910390f35b6103f560048036038101906103f09190612433565b610b4d565b005b600061040282610bd1565b9050919050565b606060008054610418906126f3565b80601f0160208091040260200160405190810160405280929190818152602001828054610444906126f3565b80156104915780601f1061046657610100808354040283529160200191610491565b820191906000526020600020905b81548152906001019060200180831161047457829003601f168201915b5050505050905090565b60006104a682610c4b565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006104ec826107ca565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561055d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161055490612797565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661057c610c96565b73ffffffffffffffffffffffffffffffffffffffff1614806105ab57506105aa816105a5610c96565b610ab9565b5b6105ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105e190612829565b60405180910390fd5b6105f48383610c9e565b505050565b6000600880549050905090565b610617610611610c96565b82610d57565b610656576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064d906128bb565b60405180910390fd5b610661838383610dec565b505050565b600061067183610851565b82106106b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106a99061294d565b60405180910390fd5b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002054905092915050565b6107136110e6565b61071d600b611164565b6000610729600b61117a565b90506107358282611188565b5050565b610754838383604051806020016040528060008152506109ef565b505050565b60006107636105f9565b82106107a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079b906129df565b60405180910390fd5b600882815481106107b8576107b76129ff565b5b90600052602060002001549050919050565b6000806107d6836111a6565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610848576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161083f90612a7a565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156108c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108b990612b0c565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6109116110e6565b61091b60006111e3565b565b6000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060018054610956906126f3565b80601f0160208091040260200160405190810160405280929190818152602001828054610982906126f3565b80156109cf5780601f106109a4576101008083540402835291602001916109cf565b820191906000526020600020905b8154815290600101906020018083116109b257829003601f168201915b5050505050905090565b6109eb6109e4610c96565b83836112a9565b5050565b610a006109fa610c96565b83610d57565b610a3f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a36906128bb565b60405180910390fd5b610a4b84848484611416565b50505050565b6060610a5c82610c4b565b6000610a66611472565b90506000815111610a865760405180602001604052806000815250610ab1565b80610a9084611492565b604051602001610aa1929190612bb4565b6040516020818303038152906040525b915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610b556110e6565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610bc5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bbc90612c55565b60405180910390fd5b610bce816111e3565b50565b60007f780e9d63000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610c445750610c438261156a565b5b9050919050565b610c548161164c565b610c93576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c8a90612a7a565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610d11836107ca565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610d63836107ca565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610da55750610da48185610ab9565b5b80610de357508373ffffffffffffffffffffffffffffffffffffffff16610dcb8461049b565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610e0c826107ca565b73ffffffffffffffffffffffffffffffffffffffff1614610e62576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e5990612ce7565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610ed2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ec990612d79565b60405180910390fd5b610edf838383600161168d565b8273ffffffffffffffffffffffffffffffffffffffff16610eff826107ca565b73ffffffffffffffffffffffffffffffffffffffff1614610f55576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f4c90612ce7565b60405180910390fd5b6004600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46110e1838383600161169f565b505050565b6110ee610c96565b73ffffffffffffffffffffffffffffffffffffffff1661110c61091d565b73ffffffffffffffffffffffffffffffffffffffff1614611162576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161115990612de5565b60405180910390fd5b565b6001816000016000828254019250508190555050565b600081600001549050919050565b6111a28282604051806020016040528060008152506116a5565b5050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611318576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161130f90612e51565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405161140991906121b5565b60405180910390a3505050565b611421848484610dec565b61142d84848484611700565b61146c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161146390612ee3565b60405180910390fd5b50505050565b606060405180608001604052806052815260200161321260529139905090565b6060600060016114a184611897565b01905060008167ffffffffffffffff8111156114c0576114bf6124d6565b5b6040519080825280601f01601f1916602001820160405280156114f25781602001600182028036833780820191505090505b509050600082602001820190505b60011561155f578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a858161154957611548612f03565b5b049450600085141561155a5761155f565b611500565b819350505050919050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061163557507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806116455750611644826119ea565b5b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff1661166e836111a6565b73ffffffffffffffffffffffffffffffffffffffff1614159050919050565b61169984848484611a54565b50505050565b50505050565b6116af8383611bb4565b6116bc6000848484611700565b6116fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116f290612ee3565b60405180910390fd5b505050565b60006117218473ffffffffffffffffffffffffffffffffffffffff16611dd2565b1561188a578373ffffffffffffffffffffffffffffffffffffffff1663150b7a0261174a610c96565b8786866040518563ffffffff1660e01b815260040161176c9493929190612f87565b602060405180830381600087803b15801561178657600080fd5b505af19250505080156117b757506040513d601f19601f820116820180604052508101906117b49190612fe8565b60015b61183a573d80600081146117e7576040519150601f19603f3d011682016040523d82523d6000602084013e6117ec565b606091505b50600081511415611832576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161182990612ee3565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161491505061188f565b600190505b949350505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106118f5577a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083816118eb576118ea612f03565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611932576d04ee2d6d415b85acef8100000000838161192857611927612f03565b5b0492506020810190505b662386f26fc10000831061196157662386f26fc10000838161195757611956612f03565b5b0492506010810190505b6305f5e100831061198a576305f5e10083816119805761197f612f03565b5b0492506008810190505b61271083106119af5761271083816119a5576119a4612f03565b5b0492506004810190505b606483106119d257606483816119c8576119c7612f03565b5b0492506002810190505b600a83106119e1576001810190505b80915050919050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b611a6084848484611df5565b6001811115611aa4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a9b90613087565b60405180910390fd5b6000829050600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161415611aec57611ae781611dfb565b611b2b565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614611b2a57611b298582611e44565b5b5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415611b6e57611b6981611fb1565b611bad565b8473ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614611bac57611bab8482612082565b5b5b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611c24576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c1b906130f3565b60405180910390fd5b611c2d8161164c565b15611c6d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c649061315f565b60405180910390fd5b611c7b60008383600161168d565b611c848161164c565b15611cc4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611cbb9061315f565b60405180910390fd5b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611dce60008383600161169f565b5050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b50505050565b6008805490506009600083815260200190815260200160002081905550600881908060018154018082558091505060019003906000526020600020016000909190919091505550565b60006001611e5184610851565b611e5b91906131ae565b9050600060076000848152602001908152602001600020549050818114611f40576000600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002054905080600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002081905550816007600083815260200190815260200160002081905550505b6007600084815260200190815260200160002060009055600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008381526020019081526020016000206000905550505050565b60006001600880549050611fc591906131ae565b9050600060096000848152602001908152602001600020549050600060088381548110611ff557611ff46129ff565b5b906000526020600020015490508060088381548110612017576120166129ff565b5b906000526020600020018190555081600960008381526020019081526020016000208190555060096000858152602001908152602001600020600090556008805480612066576120656131e2565b5b6001900381819060005260206000200160009055905550505050565b600061208d83610851565b905081600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002081905550806007600084815260200190815260200160002081905550505050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61214a81612115565b811461215557600080fd5b50565b60008135905061216781612141565b92915050565b6000602082840312156121835761218261210b565b5b600061219184828501612158565b91505092915050565b60008115159050919050565b6121af8161219a565b82525050565b60006020820190506121ca60008301846121a6565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561220a5780820151818401526020810190506121ef565b83811115612219576000848401525b50505050565b6000601f19601f8301169050919050565b600061223b826121d0565b61224581856121db565b93506122558185602086016121ec565b61225e8161221f565b840191505092915050565b600060208201905081810360008301526122838184612230565b905092915050565b6000819050919050565b61229e8161228b565b81146122a957600080fd5b50565b6000813590506122bb81612295565b92915050565b6000602082840312156122d7576122d661210b565b5b60006122e5848285016122ac565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000612319826122ee565b9050919050565b6123298161230e565b82525050565b60006020820190506123446000830184612320565b92915050565b6123538161230e565b811461235e57600080fd5b50565b6000813590506123708161234a565b92915050565b6000806040838503121561238d5761238c61210b565b5b600061239b85828601612361565b92505060206123ac858286016122ac565b9150509250929050565b6123bf8161228b565b82525050565b60006020820190506123da60008301846123b6565b92915050565b6000806000606084860312156123f9576123f861210b565b5b600061240786828701612361565b935050602061241886828701612361565b9250506040612429868287016122ac565b9150509250925092565b6000602082840312156124495761244861210b565b5b600061245784828501612361565b91505092915050565b6124698161219a565b811461247457600080fd5b50565b60008135905061248681612460565b92915050565b600080604083850312156124a3576124a261210b565b5b60006124b185828601612361565b92505060206124c285828601612477565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61250e8261221f565b810181811067ffffffffffffffff8211171561252d5761252c6124d6565b5b80604052505050565b6000612540612101565b905061254c8282612505565b919050565b600067ffffffffffffffff82111561256c5761256b6124d6565b5b6125758261221f565b9050602081019050919050565b82818337600083830152505050565b60006125a461259f84612551565b612536565b9050828152602081018484840111156125c0576125bf6124d1565b5b6125cb848285612582565b509392505050565b600082601f8301126125e8576125e76124cc565b5b81356125f8848260208601612591565b91505092915050565b6000806000806080858703121561261b5761261a61210b565b5b600061262987828801612361565b945050602061263a87828801612361565b935050604061264b878288016122ac565b925050606085013567ffffffffffffffff81111561266c5761266b612110565b5b612678878288016125d3565b91505092959194509250565b6000806040838503121561269b5761269a61210b565b5b60006126a985828601612361565b92505060206126ba85828601612361565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061270b57607f821691505b6020821081141561271f5761271e6126c4565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b60006127816021836121db565b915061278c82612725565b604082019050919050565b600060208201905081810360008301526127b081612774565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000602082015250565b6000612813603d836121db565b915061281e826127b7565b604082019050919050565b6000602082019050818103600083015261284281612806565b9050919050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206f7220617070726f76656400000000000000000000000000000000000000602082015250565b60006128a5602d836121db565b91506128b082612849565b604082019050919050565b600060208201905081810360008301526128d481612898565b9050919050565b7f455243373231456e756d657261626c653a206f776e657220696e646578206f7560008201527f74206f6620626f756e6473000000000000000000000000000000000000000000602082015250565b6000612937602b836121db565b9150612942826128db565b604082019050919050565b600060208201905081810360008301526129668161292a565b9050919050565b7f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60008201527f7574206f6620626f756e64730000000000000000000000000000000000000000602082015250565b60006129c9602c836121db565b91506129d48261296d565b604082019050919050565b600060208201905081810360008301526129f8816129bc565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b6000612a646018836121db565b9150612a6f82612a2e565b602082019050919050565b60006020820190508181036000830152612a9381612a57565b9050919050565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b6000612af66029836121db565b9150612b0182612a9a565b604082019050919050565b60006020820190508181036000830152612b2581612ae9565b9050919050565b600081905092915050565b6000612b42826121d0565b612b4c8185612b2c565b9350612b5c8185602086016121ec565b80840191505092915050565b7f2e6a736f6e000000000000000000000000000000000000000000000000000000600082015250565b6000612b9e600583612b2c565b9150612ba982612b68565b600582019050919050565b6000612bc08285612b37565b9150612bcc8284612b37565b9150612bd782612b91565b91508190509392505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000612c3f6026836121db565b9150612c4a82612be3565b604082019050919050565b60006020820190508181036000830152612c6e81612c32565b9050919050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b6000612cd16025836121db565b9150612cdc82612c75565b604082019050919050565b60006020820190508181036000830152612d0081612cc4565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000612d636024836121db565b9150612d6e82612d07565b604082019050919050565b60006020820190508181036000830152612d9281612d56565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612dcf6020836121db565b9150612dda82612d99565b602082019050919050565b60006020820190508181036000830152612dfe81612dc2565b9050919050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b6000612e3b6019836121db565b9150612e4682612e05565b602082019050919050565b60006020820190508181036000830152612e6a81612e2e565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b6000612ecd6032836121db565b9150612ed882612e71565b604082019050919050565b60006020820190508181036000830152612efc81612ec0565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600081519050919050565b600082825260208201905092915050565b6000612f5982612f32565b612f638185612f3d565b9350612f738185602086016121ec565b612f7c8161221f565b840191505092915050565b6000608082019050612f9c6000830187612320565b612fa96020830186612320565b612fb660408301856123b6565b8181036060830152612fc88184612f4e565b905095945050505050565b600081519050612fe281612141565b92915050565b600060208284031215612ffe57612ffd61210b565b5b600061300c84828501612fd3565b91505092915050565b7f455243373231456e756d657261626c653a20636f6e736563757469766520747260008201527f616e7366657273206e6f7420737570706f727465640000000000000000000000602082015250565b60006130716035836121db565b915061307c82613015565b604082019050919050565b600060208201905081810360008301526130a081613064565b9050919050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b60006130dd6020836121db565b91506130e8826130a7565b602082019050919050565b6000602082019050818103600083015261310c816130d0565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b6000613149601c836121db565b915061315482613113565b602082019050919050565b600060208201905081810360008301526131788161313c565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006131b98261228b565b91506131c48361228b565b9250828210156131d7576131d661317f565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfe68747470733a2f2f7733732e6c696e6b2f697066732f62616679626569643561677a3671756e6375756175696772706d366779697a37687968623272646c37726579726969666c7972737a6a63377375342fa2646970667358221220613af1308bc0be70a468d9f4266da505cd7ca56af9fbd40c0575af63556c212a64736f6c63430008090033";

type NFTTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFTToken__factory extends ContractFactory {
  constructor(...args: NFTTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    mintedTokenCount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NFTToken> {
    return super.deploy(mintedTokenCount, overrides || {}) as Promise<NFTToken>;
  }
  override getDeployTransaction(
    mintedTokenCount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(mintedTokenCount, overrides || {});
  }
  override attach(address: string): NFTToken {
    return super.attach(address) as NFTToken;
  }
  override connect(signer: Signer): NFTToken__factory {
    return super.connect(signer) as NFTToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTTokenInterface {
    return new utils.Interface(_abi) as NFTTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTToken {
    return new Contract(address, _abi, signerOrProvider) as NFTToken;
  }
}
