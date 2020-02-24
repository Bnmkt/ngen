export const imports = {
    SimplexNoise: require("simplex-noise"),
    str2seed: (str)=>{
        const a = ['a','b', 'c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        let c = 0,d=0;
        str.split('').forEach((b,i)=>{
            c+=a.indexOf(b.toLowerCase())+(d*i)
            d++
        })
        return Math.round((c*Math.PI)*1024)
    }
}