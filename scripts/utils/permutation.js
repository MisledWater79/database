export function getPermutationData(block){
    const permutation = block.permutation
    let permData = {
        id: block.id,
        permData: {}
    };
    for(const property of permutation.getAllProperties()){
        permData.permData[property.name] = property.value;
    }/*
    if(block.getComponent('inventory')){
        let inventory = []
        for(let i = 0; i < block.getComponent('inventory').container.size; i++){
            let item = block.getComponent('inventory').container.getItem(i)
            if(item){
                let inv = {}
                inv.slot = i
                inv.amount = item.amount
                inv.data = item.data
                inv.id = item.id
                inv.nameTag = item.nameTag
                inventory.push(inv)
            }
        }
        permData.inventory = inventory
    }
    if(block.getComponent('sign')){
    }
    if(block.getComponent('piston')){
    }
    if(block.getComponent('lavacontainer')){
    }*/
    return permData;
}

export function setPermutationData(permutation, permutationData){
    for(const propertyName in permutationData){
        if(Object.hasOwnProperty.call(permutationData, propertyName)){
            const value = permutationData[propertyName];
            permutation.getProperty(propertyName).value = value;
        }
    }
    return permutation;
}