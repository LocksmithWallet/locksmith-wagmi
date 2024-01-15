import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useContract,
  useContractRead,
  useContractWrite,
  useProvider,
} from 'wagmi';
import { LocksmithInterface } from './LocksmithInterface.js';

export function useLocksmithContract(contract, addressOverride = null) {
  const network = useNetwork();
  const provider = useProvider();
  return useContract({
     // address: addressOverride || Networks.getContractAddress(network.chain.id, contract),
     abi: LocksmithInterface.getAbi(contract).abi,
     provider
  });
}
