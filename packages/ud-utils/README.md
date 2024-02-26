## :toolbox: Functions

- [isZero](#gear-iszero)
- [formatCurrency](#gear-formatcurrency)
- [formatToUsd](#gear-formattousd)
- [formatToPercent](#gear-formattopercent)
- [formatStrMiddleEllipsis](#gear-formatstrmiddleellipsis)
- [formatDate](#gear-formatdate)
- [getBase64](#gear-getbase64)
- [secondToDay](#gear-secondtoday)
- [monthDayDiff](#gear-monthdaydiff)
- [getWeek](#gear-getweek)
- [scientificNotationToString](#gear-scientificnotationtostring)
- [formatMoney](#gear-formatmoney)
- [formatTimeToDays](#gear-formattimetodays)
- [dateUtc2Local](#gear-dateutc2local)
- [parseFromMillion](#gear-parsefrommillion)
- [changeURLArg](#gear-changeurlarg)
- [fixedDecimals](#gear-fixeddecimals)

### :gear: isZero

判断字符串是否是空值 ex:0x0000000000000

| Function | Type |
| ---------- | ---------- |
| `isZero` | `(hexNumberString: string) => boolean` |

### :gear: formatCurrency

数字格式化

| Function | Type |
| ---------- | ---------- |
| `formatCurrency` | `(num: string or number, precision?: number, noZero?: boolean, delta?: number) => string` |

Parameters:

* `num`: 要格式化的数字
* `precision`: 保留几位小数。默认为2
* `noZero`: 小数位是否要补0 true：不需要补0  false：需要补0
* `delta`: 偏移量 默认为1不做偏移


### :gear: formatToUsd

格式化成美元（只是在formatCurrency基础上加上美元符号）
入参和出参和formatCurrency一致

| Function | Type |
| ---------- | ---------- |
| `formatToUsd` | `(value: string or number, decimal?: number, noZero?: boolean, delta?: number) => string` |

### :gear: formatToPercent

格式化成百分比格式

| Function | Type |
| ---------- | ---------- |
| `formatToPercent` | `(value: string or number, decimal?: number, delta?: number) => string` |

Parameters:

* `value`: 要格式化的数字
* `decimal`: 保留几位小数。默认为2
* `delta`: 偏移量 默认为100


### :gear: formatStrMiddleEllipsis

文字中间设置省略号

| Function | Type |
| ---------- | ---------- |
| `formatStrMiddleEllipsis` | `(text?: string, firstLen?: number, lastLen?: number) => string` |

Parameters:

* `text`: 字符串
* `firstLen`: 前面保留字符数，默认为6
* `delta`: 后面保留字符数，默认为4


### :gear: formatDate

| Function | Type |
| ---------- | ---------- |
| `formatDate` | `(datetime: string or number, dateJoinSymbol?: string, accurateToSeconds?: boolean, timeJoinSymbol?: string) => string` |

### :gear: getBase64

| Function | Type |
| ---------- | ---------- |
| `getBase64` | `(file: Blob) => Promise<unknown>` |

### :gear: secondToDay

秒转天

| Function | Type |
| ---------- | ---------- |
| `secondToDay` | `(second: number) => number` |

Parameters:

* `second`: 秒


### :gear: monthDayDiff

| Function | Type |
| ---------- | ---------- |
| `monthDayDiff` | `(startTime: string or number or Date, endTime: string or number or Date) => number[]` |

### :gear: getWeek

| Function | Type |
| ---------- | ---------- |
| `getWeek` | `(timeStampMs: string or number or Date) => any` |

### :gear: scientificNotationToString

| Function | Type |
| ---------- | ---------- |
| `scientificNotationToString` | `(param: number) => string` |

### :gear: formatMoney

大数字转带单位的数字
大于3位单位为k eg. 1001=>1.001k
大于6位单位为M eg. 1200000 => 1.2M 
大于9位单位为B eg. 120000000 => 0.12B

| Function | Type |
| ---------- | ---------- |
| `formatMoney` | `(value: number, maxValue?: number) => string` |

Parameters:

* `value`: 要转的数字
* `maxValue`: 一堆数字中的最大数字，如果有值则单位按照这个最大数字来计算，否则单位根据实际传入数字计算


### :gear: formatTimeToDays

| Function | Type |
| ---------- | ---------- |
| `formatTimeToDays` | `(millisecond: number, lang?: "zh-CN" or "en", minUnit?: number, maxUnit?: number) => string` |

### :gear: dateUtc2Local

//去掉日期数据中的T 和Z

| Function | Type |
| ---------- | ---------- |
| `dateUtc2Local` | `(date_time: string or number or Date) => Date` |

### :gear: parseFromMillion

| Function | Type |
| ---------- | ---------- |
| `parseFromMillion` | `(num: number) => number` |

### :gear: changeURLArg

| Function | Type |
| ---------- | ---------- |
| `changeURLArg` | `(url: string, arg: string, arg_val: string) => string` |

### :gear: fixedDecimals

保留小数

| Function | Type |
| ---------- | ---------- |
| `fixedDecimals` | `(val: string or number, decimals: number) => string` |

Parameters:

* `val`: 数值
* `decimals`: 保留的位数



