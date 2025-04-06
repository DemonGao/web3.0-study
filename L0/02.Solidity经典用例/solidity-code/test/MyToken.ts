import hre, {ethers} from 'hardhat'

import {expect} from 'chai'
import { MyToken } from '../typechain-types';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

/**
 * 初次尝试 hardhat 测试
 * 
 * npx hardhat test test/MyToken.ts
 */
describe("MyToken Test", async () => {
    beforeEach(async () => {
        console.log('等待 2s')

        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(1)
            }, 2000)
        })

        console.log("开始运行测试用例")
    })

    it ("test1",async () => {
        console.log("我是 test1")
    })

    it ("test2",async () => {
        console.log("我是 test2")
    })
})



describe("测试 MyToken 合约部署", async () => {

    const initialSupply = 10000;

    let MytokenContract: MyToken | undefined;

    let account1: HardhatEthersSigner, account2: HardhatEthersSigner;

    beforeEach(async () => {

        [account1, account2] = await ethers.getSigners();

        const MyToken = await ethers.getContractFactory('MyToken')

        // MyToken.deploy 认为 account1 
        // 也可以指定 deploy 账户，MyToken.connect(account1).deploy(initialSupply)
        MytokenContract = await MyToken.deploy(initialSupply)

        MytokenContract.waitForDeployment()

        const contractAddress = await MytokenContract.getAddress();

        expect(contractAddress).to.length.greaterThan(0)

        console.log(`contractAddress = ${contractAddress}`)
    })

    it ("验证合约的 name、symbol、decimal",async () => {
        console.log("我是 test1")

        const name = await MytokenContract?.name();

        const symbol = await MytokenContract?.symbol();

        const decimals = await MytokenContract?.decimals();

        expect(name).to.equal("MyToken")
        expect(symbol).to.equal("MTK")
         
        expect(decimals).to.equal(18)

    })


    it ("测试Account1账户余额",async () => {
        const balanceOfAccount1 = await MytokenContract?.balanceOf(account1)
        expect(balanceOfAccount1).to.equal(initialSupply);
    })

    it ("测试转账",async () => {
        const res = await MytokenContract?.transfer(account2, initialSupply / 2)

        console.log(res);

        const balanceOfAccount1 = await MytokenContract?.balanceOf(account1)

        expect(balanceOfAccount1).to.equal(initialSupply / 2)
    })
})