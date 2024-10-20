class math {
getInfo() {
return {
id: 'math',
name: '数学',
color1: "#5ac35a",
blocks: [

                    {
                        opcode: "tonumber",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "将 [a] 转为数字",
                        extensions: ["colours_operators"],
                        arguments: {
                            a: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "true"
                            }
                        }
                    },
                    {
                        opcode: "toint",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "将 [a] 转为整数",
                        extensions: ["colours_operators"],
                        arguments: {
                            a: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "1.2"
                            }
                        }
                    },
                    {
                        opcode: "isInt",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "[a] 是整数？",
                        extensions: ["colours_operators"],
                        arguments: {
                            a: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "5"
                            }
                        }
                    },
                    {
                        opcode: "isprime",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "[a] 是质数？",
                        extensions: ["colours_operators"],
                        arguments: {
                            a: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "13"
                            }
                        }
                    },
                    {
                        opcode: "isFinite",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "[a] 是有限的？",
                        extensions: ["colours_operators"],
                        arguments: {
                            a: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "Infinity"
                            }
                        }
                    },
                    {
                        opcode: "toFixed",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "将 [a] 四舍五入至 [b] 位小数",
                        extensions: ["colours_operators"],
                        arguments: {
                            a: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "1.23"
                            },
                            b: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "10"
                            }
                        }
                    },
                    {
                        opcode: "math",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "计算 [a]",
                        extensions: ["colours_operators"],
                        arguments: {
                            a: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "PI*pow(4,2)"
                            }
                        }
                    },
                    {
                        opcode: "gcd",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "[s] 的最大公因数",
                        extensions: ["colours_operators"],
                        arguments: {
                            s: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "[10,15,45]"
                            }
                        }
                    },
                    {
                        opcode: "gcm",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "[s] 的最小公倍数",
                        extensions: ["colours_operators"],
                        arguments: {
                            s: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "[10,15,18]"
                            }
                        }
                    },
                    {
                        opcode: "base",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "把 [b] 进制的 [a] 转换为 [c] 进制",
                        extensions: ["colours_operators"],
                        arguments: {
                            a: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "FE"
                            },
                            b: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "16"
                            },
                            c: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "8"
                            }
                        }
                    },

					{
						opcode:"pi1000",
						text:"π（小数点后1000位），返回 [type] 类型",
						blockType:Scratch.BlockType.REPORTER,
						extensions: ["colours_operators"],
						arguments:{
							type:{
								type:Scratch.ArgumentType.STRING,
								menu:"type",
								defaultValue:"string"
							},
						},
					},

],
        menus: {
          type: {
            acceptReporters: true,
            items: [
              {
                text: "数字",
                value:"Number",
              },
              {
                text: "文本",
                value:"String",
              },
            ],
          },
          math2: {
            acceptReporters: true,
            items: ["sin","sinh","asin","asinh","cos","cosh","acos","acosh","tan","tanh","atan","atanh"],
          },

},
};
}
        tonumber (args) {
            if (args.a=="true") {
                return 1;
            } 
            if (args.a=="false") {
                return 0;
            }
            return Number(args.a);
        }
        toint (args) {
            return parseInt(args.a);
        }
        isInt (args) {
            return Number.isInteger(args.a);
        }
        random (args) {
            return Math.random();
        }
        isFinite (args) {
            return Number.isFinite(args.a);
        }
        math (args) {
            let keys=Reflect.ownKeys(Math).slice(0,-1);
            for (let i in keys) {
                args.a=args.a.replaceAll(keys[i], "Math."+keys[i]);
            }
            try {
                eval(args.a);
            } catch(e) {
                return NaN;
            }
            return eval(args.a);
        }
        math2 (args) {
            try {
                return Math[String(args.op)](Scratch.Cast.toNumber(args.num));
            } catch(e) {
                return NaN;
            }
        }

        toFixed (args) {
            return args.a.toFixed(args.b);
        }
    _gcd (args) {
        if (args.length==1) {
            return args[0];
        }
        if (args.length==2) {
            if (args[0]%args[1]==0) {
                return args[1];
            } else {
                return this._gcd([args[1], args[0]%args[1]]);
            }
        }else{
            return this._gcd([args[0], this._gcd(args.slice(1))]);
        }
    }
    _gcm (args) {
        if (args.length==1) {
            return args[0];
        }
        if (args.length==2) {
            return args[0]*args[1]/this._gcd(args)
        } else {
            return this._gcm([args[0], this._gcm(args.slice(1))]);
        }
    }

        gcd (args) {
            try {
                JSON.parse(String(args.s));
            } catch(e) {
                return NaN;
            }
            return this._gcd(JSON.parse(String(args.s)).map(Scratch.Cast.toNumber));
        }
        gcm (args) {
            try {
                JSON.parse(String(args.s));
            } catch(e) {
                return NaN;
            }
            return this._gcm(JSON.parse(String(args.s)).map(Scratch.Cast.toNumber));
        }
        base (args) {
            let fb=parseInt(args.b);
            let tb=parseInt(args.c);
            if (!(fb==fb&&fb>=2&&fb<=36)) {
                fb=10;
            }
            if (!(tb==tb&&tb>=2&&tb<=36)) {
                tb=10;
            }
            console.log(args.a,fb,tb);
            return parseInt(args.a,fb).toString(tb);
        }
        isprime (args) {
            let n=parseFloat(args.a);
            if (!Number.isInteger(n)||n<2) {
                return false;
            }
            for (let i=2; i*i<=n; i++) {
                if (n%i==0) {
                    return false;
                }
            }
            return true;
        }
pi1000(args){
	if(args.type=="String") return "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";
	if(args.type=="Number") return 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989;

}


}
Scratch.extensions.register(new math());
