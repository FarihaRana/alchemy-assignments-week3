import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import Escrow from './Escrow';
import axios from "axios";
import ContractHistory from './contractHistory';
const server = axios.create({
  baseURL: "http://localhost:3042",
});

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve({ gasLimit: 200000 });
  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(await provider.getSigner());
    }

    getAccounts();
  }, [account]);

  // async function fetchContractApprovalStatus(escrowContract) {
  //   const isApproved = await escrowContract.isApproved();
  //   return isApproved;
  // }

  async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    const value = document.getElementById('wei').value;
    const parseValue = ethers.utils.parseEther(value);
    const escrowContract = await deploy(signer, arbiter, beneficiary, parseValue);
    const address = escrowContract.address;
    // const isApproved = await fetchContractApprovalStatus(escrowContract);
      await server.post("/contracts", {
        address,
        arbiter,
         beneficiary,
         value,
      });
      
  const escrow = {
      address,
      arbiter,
      beneficiary,
      value: value.toString(),
      // isApproved,
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className =
            'complete';
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });
        
        await approve(escrowContract, signer);
      },
    };

    setEscrows([...escrows, escrow]);

  }

  return (
    <>
      <div className="contract">
        <h1> New Contract </h1>
        <label>
          Arbiter Address
          <input type="text" id="arbiter" />
        </label>

        <label>
          Beneficiary Address
          <input type="text" id="beneficiary" />
        </label>

        <label>
          Deposit Amount (in Wei)
          <input type="text" id="wei" />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            newContract();
          }}
        >
          Deploy
        </div>
      </div>

      <div className="existing-contracts">
        <h1> Existing Contracts </h1>

        <div id="container">
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} />;
          })}
        </div>
        <div><ContractHistory/></div>
      </div>
    </>
  );
}

export default App;
