import fs from "fs";
import { artifacts, network} from "hardhat";
import { resolve, join } from "path";
interface IInfo {
    name: string,
    network: string,
    address: string,
}
interface IData {
    info: IInfo,
    abi: any,
}
export const contractAbi = async ( addr: string, name: string) => {
    const artifact = await artifacts.readArtifact(name);

    const data: IData = {
        info: {
            name:"",
            network:"",
            address:""
        },
        abi: {}
    };
    data["info"]["name"] = name;
    data["info"]["network"] = network.name;
    data["info"]["address"] = addr;
    data["abi"] = artifact.abi;
    await createContractFile(name, data);
}

const createContractFile = async (fileName: string, data: IData) => {
    const depPath = resolve(join(__dirname, "..","abi"));
    // const depPath = resolve(join(__dirname, "..","..","vue_pro","src", "abi"));
    const exist = fs.existsSync(depPath)

    if (!exist) fs.mkdirSync(depPath);
    const fileNamePath = resolve(join(depPath, `${fileName}.json`));
    fs.writeFileSync(`${fileNamePath}`, JSON.stringify(data));
}