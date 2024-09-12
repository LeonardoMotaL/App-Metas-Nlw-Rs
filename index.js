let meta = {
    value: "meta1",
    address: 2,
    checked: true,
    log: (info) => {
        console.log(info)
    }
}

meta.value = "meta2"
meta.log(meta.value)