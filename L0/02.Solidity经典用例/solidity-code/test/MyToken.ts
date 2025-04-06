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