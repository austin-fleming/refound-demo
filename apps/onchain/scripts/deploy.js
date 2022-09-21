// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

    const [owner, otherAccount] = await ethers.getSigners();

    const FakeUSDC = await ethers.getContractFactory("fakeUSDC");
    const fakeUSDC = await FakeUSDC.deploy(owner.address);

    const Refound = await ethers.getContractFactory("Refound");
    const refound = await Refound.deploy();

    await fakeUSDC.deployed();
    const RefoundUSD = await ethers.getContractFactory("RefoundUSD");
    const refoundUSD = await RefoundUSD.deploy(fakeUSDC.address);

    await refoundUSD.deployed();
    const FundingPool = await ethers.getContractFactory("FundingPool");
    const fundingPool = await FundingPool.deploy(refoundUSD.address, 100000000);

    const RefoundPost = await ethers.getContractFactory("RefoundPost");
    const refoundPost = await RefoundPost.deploy(refound.address, refoundUSD.address);

    await fundingPool.deployed();
    await refound.deployed();
    await refound.changeAddresses(refoundPost.address);
    await refoundPost.deployed();
    await refoundPost.updatePrice(0, 100);
    await refoundPost.updatePrice(1, 250);
    await refoundPost.updatePrice(2, 1000);
    await refoundPost.updatePrice(3, 20000);

    console.log(
        `    FakeUSDC contract deployed to ${fakeUSDC.address}
    Refound contract deployed to ${refound.address}
    RefoundUSD contract deployed to ${refoundUSD.address}
    FundingPool contract deployed to ${fundingPool.address}
    RefoundPost contract deployed to ${refoundPost.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
