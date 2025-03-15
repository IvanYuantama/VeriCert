const hre = require("hardhat");

async function main() {
    const Cert = await hre.ethers.getContractFactory("Cert");
    const cert = await Cert.deploy(); 

    // Tunggu hingga kontrak benar-benar terdeploy
    await cert.waitForDeployment(); // Gantilah cert.deployed() dengan ini

    console.log("Cert terdeploy di:", await cert.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
