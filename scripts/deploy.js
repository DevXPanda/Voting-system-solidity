const hre = require("hardhat");

async function main() {
  // Get the account that will deploy the contract
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory for the Voting contract
  const Voting = await hre.ethers.getContractFactory("Voting");

  // Deploy the contract
  console.log("Voting contract deployment started...");
  const voting = await Voting.deploy();
  
  // Log the contract object to check if it's deployed successfully
  console.log("Voting contract object:", voting);

  try {
    // Check if the contract address is defined
    if (voting.address) {
      console.log("Voting contract deployed to:", voting.address);
    } else {
      console.error("Deployment failed, contract address is undefined.");
    }
  } catch (error) {
    console.error("Error during contract deployment:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during contract deployment:", error);
    process.exit(1);
  });
