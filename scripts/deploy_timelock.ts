import { timeLockDeploy } from "./timelock.module";


async function main() {
    const timeLockContract = await timeLockDeploy("0xEC79934B99941A757a9201b872ae18fa60B48921");
    console.log("timeLockContract is %s",timeLockContract.address)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});