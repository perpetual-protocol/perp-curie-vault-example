import { ethers, waffle } from "hardhat"
import { FungibleVault } from "../typechain"
import { FakeContract, smock } from "@defi-wonderland/smock"

interface FungibleVaultFixture {
    vault: FakeContract
    marketRegistry: FakeContract
    baseToken: FakeContract
    fungibleVault: FungibleVault
}

async function fungibleVaultFixture(): Promise<FungibleVaultFixture> {
    const vault = await smock.fake("Vault")
    const marketRegistry = await smock.fake("MarketRegistry")
    const baseToken = await smock.fake("BaseToken")

    const fungibleVaultFactory = await ethers.getContractFactory("FungibleVault")
    const fungibleVault = await fungibleVaultFactory.deploy(vault.address, marketRegistry.address, baseToken.address)
    return { vault, marketRegistry, baseToken, fungibleVault }
}
describe("FungibleVault spec", function () {
    const [admin] = waffle.provider.getWallets()
    const loadFixture: ReturnType<typeof waffle.createFixtureLoader> = waffle.createFixtureLoader([admin])
    let fungibleVault: FungibleVault
    let vault: FakeContract
    let marketRegistry: FakeContract
    let baseToken: FakeContract

    beforeEach(async () => {
        const fixture = await loadFixture(fungibleVaultFixture)
        fungibleVault = fixture.fungibleVault
        vault = fixture.vault
        marketRegistry = fixture.marketRegistry
        baseToken = fixture.baseToken
    })

    describe("properties", () => {
        it("has same settlement token as vault")
        it("support only 1 base token")
    })

    describe("mint", () => {
        it("increase minter's LP token balance")
        it("decrease minter's settlement token balance")
    })

    describe("transfer", () => {})
    describe("burn", () => {
        it("decrease minter's LP token balance")
        it("increase minter's settlement token balance")
    })
})
