import { useEffect, useState } from "react";

export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  handleApprove,
}) {
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApproveClick = async () => {
    setIsLoading(true);
    try {
      await handleApprove(); 
      setIsApproved(true);
      localStorage.setItem(`${address}_approval`, 'true'); 
    } catch (error) {
      console.error('Error occurred during approval:', error);
      setIsLoading(false); 
    }finally {
      setIsLoading(false); 
    }
  };
 useEffect(() => {
  const storedApprovalStatus = localStorage.getItem(`${address}_approval`);
  if (storedApprovalStatus === 'true') {
    setIsApproved(true);
  }
}, [address]);

  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Contract </div>
          <div> {address} </div>
        </li>
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {value} Ether </div>
        </li>
        {!isApproved ? (
          <div
             className={"button"}
            id={address}
            onClick={(e) => {
              e.preventDefault();
              // handleApprove();
              handleApproveClick();
            }}
            disabled={isLoading}
          >
           {isLoading ? 'Approving...' : 'Approve'}
          </div>
        ) : (
          <div><p>✓ It's been approved!</p></div>
        )}
      </ul>
    </div>
  );
}
