transaction(name: String, code: String) {
    prepare(acct: AuthAccount) {
        acct.contracts.add(name: name, code: code.decodeHex())
    }
}