var MockJS = require('mockjs');

var MockData = {
    // 银行+首页
    '/fp/user/bankPlusHome': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'position': {
                'investAmount|10000-100000.2': 1,
                'latestIncome|10-100.2': 1
            },
            'banner': {
                'pool|1-3': [{
                    'linkUrl': 'https://qianbao.jd.com/p/page/RNdK4366a0ca.htm',
                    'h5ImageUrl': '@image("750x170", "#894FC4", "#FFF")',
                }]
            },
            "notice":{
                'icon': '',
                'canClose': '0',
                'contents|2-5': [{
                    'name': '天府银行年化6.18%半年期理财限量抢！',
                    'value': '//m.jd.com'
                }]
            },
            'channelList|10-19': [{
                'channelName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
                'channelIcon': function() {
                    return 'https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/'+ this.channelId +'.png'
                },
                'channelId|1': ['spdb','tfb','cmbc','bsb','bol','bon','nbcb','jnrc','cqfm','cjccb','bob','qlb','bodl'],
                'channelJdPin|+1': 1,
                'expertUid|+1': 1
            }],
            'productList|1-3': [{
                'interestRate_temp|1-8.2': 1,
                'channelId|1': ['tfb','spdb', 'bsb'],
                'productType|1': [0, 1],
                'productId|1-100': 1,
                'interestRate': function() {
                    return this.interestRate_temp + '%';
                },
                'jumpVersion|0-1': 0,
                'productText': '财富走向 100天',
                'duration': '120天',
                'status|1': ['0', '1', '2', '3'],
                'tips|0-1': ['新手专享'],
                'channelName|1':  ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
                'minInvestAmount|1-10': 1
            }]
        }
    },

    // 银行+全部理财
    '/fp/norm/product/allProducts': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'banner': {
                'pool|1-3': [{
                    'linkUrl': 'https://qianbao.jd.com/p/page/RNdK4366a0ca.htm',
                    'h5ImageUrl': '//img11.360buyimg.com/wympay/jfs/t5803/326/6006872961/49440/2a85329b/59672419N4366a7df.jpg',
                }]
            },
            "orderby": [
            {
                "id": "orderType",
                "name": "综合排序",
                "checked": -1,
                "list": [
                {
                    "id": -1,
                    "desc": "综合排序"
                },
                {
                    "id": 1,
                    "desc": "收益从高到低"
                },
                {
                    "id": 2,
                    "desc": "期限从短到长"
                },
                {
                    "id": 3,
                    "desc": "期限从长到短"
                }]
            },
            {
                "id": "productType",
                "name": "产品类型",
                "checked": -1,
                "list": [
                {
                    "id": -1,
                    "desc": "不限"
                },
                {
                    "id": 1,
                    "desc": "定期"
                },
                {
                    "id": 2,
                    "desc": "活期"
                },
                {
                    "id": 3,
                    "desc": "存款"
                },
                {
                    "id": 5,
                    "desc": "结构性存款"
                }]
            }],
            'products': {
                'hasMore': function() {
                    if (this.list.length > 0) {
                        return true;
                    }
                    return false;
                },
                'list|0-10': [{
                    'productId|+1': 1,
                    'productText': function() {
                        return '安心计划1年' + this.productId;
                    },
                    'jumpVersion|0-1': 0,
                    'productType|1': [0, 1],
                    'tips|0-1': ['高收益', '综合年化6.15%'],
                    'interestRate|1': ['6.18%', '4.52%'],
                    'duration|1': ['120天', '1年'],
                    'channelId|1': ['tfb','spdb', 'bsb'],
                    'channelName|1':  ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
                    'minInvestAmount|1': ['5万', '10万'],
                    'status|0-4': 0
                }]
            }
        }
    },

    // 银行+全部理财(大改版)
    '/fw/product/list': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
            "orderBy": [
            {
                "id": "orderType",
                "name": "综合排序",
                "checked": "-1",
                "list": [
                {
                    "id": "-1",
                    "desc": "综合排序"
                },
                {
                    "id": "1",
                    "desc": "收益从高到低"
                },
                {
                    "id": "2",
                    "desc": "期限从短到长"
                },
                {
                    "id": "3",
                    "desc": "期限从长到短"
                }]
            },
            {
                "id": "productType",
                "name": "产品类型",
                "checked": "-1",
                "list": [
                {
                    "id": "-1",
                    "desc": "不限"
                },
                {
                    "id": "FIXED",
                    "desc": "定期理财"
                },
                {
                    "id": "CURRENT",
                    "desc": "活期理财"
                },
                {
                    "id": "DEPOSIT",
                    "desc": "存款"
                },
                {
                    "id": "STRUCTURED_DEPOSIT",
                    "desc": "结构性存款"
                }]
            },
            {
                "id": "channelCode",
                "name": "银行",
                "checked": "-1",
                "list": [
                {
                    "id": "-1",
                    "desc": "不限"
                },
                {
                    "id": "czcb",
                    "desc": "稠州银行"
                },
                {
                    "id": "cqfm",
                    "desc": "富民银行"
                },
                {
                    "id": "cmbc",
                    "desc": "民生银行"
                },
                {
                    "id": "whzb",
                    "desc": "众邦银行"
                },
                {
                    "id": "bon",
                    "desc": "南京银行"
                },
                {
                    "id": "bol",
                    "desc": "廊坊银行"
                },
                {
                    "id": "tfb",
                    "desc": "天府银行"
                },
                {
                    "id": "qlb",
                    "desc": "齐鲁银行"
                },
                {
                    "id": "bsb",
                    "desc": "包商银行"
                },
                {
                    "id": "spdb",
                    "desc": "浦发银行"
                },
                {
                    "id": "bob",
                    "desc": "蓝海银行"
                },
                {
                    "id": "bodl",
                    "desc": "大连银行"
                },
                {
                    "id": "cjccb",
                    "desc": "长江商业银行"
                },
                {
                    "id": "nbcb",
                    "desc": "宁波银行"
                },
                {
                    "id": "jnrc",
                    "desc": "江南农商"
                }]
            }],
            "products":
            {
                "hasMore": true,
                "list": [
                {
                    'productId': "@id()",
                    "productText": "富民宝",
                    "productType": 4,
                    "tips": ["随存随取", "当日起息"],
                    "interestRate": "4.70%",
                    "duration": "灵活",
                    "minInvestAmount": "50.00元",
                    "status": "2",
                    "channelName": "富民银行",
                    "channelId": "cqfm",
                    "jumpVersion": 1,
                    "proprietary": "jdjr",
                    "statusDesc": "123"
                },
                {
                    'productId': "@id()",
                    "productText": "安邦安增益2号",
                    "productType": 4,
                    "tips": ["35天期", "滚动续买"],
                    "interestRate": "4.75%",
                    "duration": "35天",
                    "minInvestAmount": "1000.00元",
                    "status": "1",
                    "channelName": "民生银行",
                    "channelId": "cmbc",
                    "jumpVersion": 1,
                    "proprietary": null,
                    "statusDesc": ""
                },
                {
                    'productId': "@id()",
                    "productText": "众邦宝180天期",
                    "productType": 6,
                    "tips": ["180天期", "可提前支取"],
                    "interestRate": "5.20%",
                    "duration": "180天",
                    "minInvestAmount": "100.00元",
                    "status": "1",
                    "channelName": "众邦银行",
                    "channelId": "whzb",
                    "jumpVersion": 1,
                    "statusDesc": ""
                },
                {
                    'productId': "@id()",
                    "productText": "众邦宝90天期",
                    "productType": 6,
                    "tips": ["90天期", "可提前支取"],
                    "interestRate": "5.00%",
                    "duration": "90天",
                    "minInvestAmount": "100.00元",
                    "status": "1",
                    "channelName": "众邦银行",
                    "channelId": "whzb",
                    "jumpVersion": 1,
                    "statusDesc": ""
                },
                {
                    'productId': "@id()",
                    "productText": "众邦宝30天期",
                    "productType": 6,
                    "tips": ["30天期", "可提前支取"],
                    "interestRate": "4.80%",
                    "duration": "30天",
                    "minInvestAmount": "100.00元",
                    "status": "1",
                    "channelName": "众邦银行",
                    "channelId": "whzb",
                    "jumpVersion": 1,
                    "statusDesc": ""
                },
                {
                    'productId': "@id()",
                    "productText": "结构性存款844期",
                    "productType": 5,
                    "tips": null,
                    "interestRate": "5.40%",
                    "duration": "364天",
                    "minInvestAmount": "1000.00元",
                    "status": "1",
                    "channelName": "蓝海银行",
                    "channelId": "bob",
                    "jumpVersion": 1,
                    "statusDesc": ""
                },
                {
                    'productId': "@id()",
                    "productText": "结构性存款845期",
                    "productType": 5,
                    "tips": null,
                    "interestRate": "5.28%",
                    "duration": "180天",
                    "minInvestAmount": "1000.00元",
                    "status": "1",
                    "channelName": "蓝海银行",
                    "channelId": "bob",
                    "jumpVersion": 1,
                    "statusDesc": ""
                },
                {
                    'productId': "@id()",
                    "productText": "凡荣结构性存款6号",
                    "productType": 5,
                    "tips": null,
                    "interestRate": "5.26%",
                    "duration": "182天",
                    "minInvestAmount": "1000.00元",
                    "status": "1",
                    "channelName": "稠州银行",
                    "channelId": "czcb",
                    "jumpVersion": 1,
                    "statusDesc": ""
                },
                {
                    'productId': "@id()",
                    "productText": "凡荣结构性存款5号",
                    "productType": 5,
                    "tips": ["92天期", "到期自动兑付"],
                    "interestRate": "5.05%",
                    "duration": "92天",
                    "minInvestAmount": "1000.00元",
                    "status": "1",
                    "channelName": "稠州银行",
                    "channelId": "czcb",
                    "jumpVersion": 1,
                    "statusDesc": ""
                },
                {
                    'productId': "@id()",
                    "productText": "氧乐存（6个月）",
                    "productType": 1,
                    "tips": null,
                    "interestRate": "1.88%",
                    "duration": "6个月",
                    "minInvestAmount": "100.00元",
                    "status": "1",
                    "channelName": "包商银行",
                    "channelId": "bsb",
                    "jumpVersion": 0,
                    "statusDesc": ""
                }]
            },
            "excludeIds": [1580, 365, 2647, 2646, 2645, 3099, 3098, 3097, 3078, 155]
        }
    },
    // 银行+我的资产
    '/fp/user/bankPlusAsset': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'position': {
                'investAmount|10000-99999.1-2': 1,
                'latestIncome|100-5000.1-2': 1,
                'totalIncome|10000-50000.1-2': 1
            },
            'orders': {
                'hasMore': function() {
                    if (this.list.length > 0) {
                        return true;
                    }
                    return false;
                },
                'list|0-9': [{
                    'orderType|1': [0, 1, 2],
                    'orderId|+1': 1,
                    'channelId|1': ['bsb', 'tfb'],
                    'productId|+1': 1,
                    'name|1': ['财富走向 100天', '安心计划1年'],
                    'tips|1': ['', '标'],
                    'amount|10000-99999.1-2': 1,
                    'income|100-999.1-2': 1,
                    'incomeDesc|1': ['当前收益', '最新收益'],
                    'bankName|1':  ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
                    'status|1': ['00', '01', '02', '03'],
                    'fundInitCost': 1,
                    'fundPropertyState': [1, 2, 3, 4, 5, 6, 7, 8]
                }]
            }
        }
    },

    // 银行+我的资产
    '/fp/api/channelAsset': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'position': {
                'investAmount|10000-99999.1-2': 1,
                'latestIncome|100-5000.1-2': 1,
                'totalIncome|10000-50000.1-2': 1,
                'currentIncome|10000-50000.1-2': 1,
                'income|10000-50000.1-2': 1,
                'incomeText|1': ['今日支取收益','最新收益(元)','当前收益(元)']
            },
            'account': {
                'available': '10,000.00',
                'availableDes': '产品回款时，本息会返回至您的电子账户'
            },
            'orders': {
                'hasMore': function() {
                    if (this.list.length > 0) {
                        return true;
                    }
                    return false;
                },
                'list|0-9': [{
                    'orderType|1': [0, 1, 2],
                    'orderId|+1': 1,
                    'channelId|1': ['bsb', 'tfb'],
                    'productId|+1': 1,
                    'name|1': ['财富走向 100天', '安心计划1年'],
                    'tips|1': ['', '标'],
                    'amount|10000-99999.1-2': 1,
                    'income|100-999.1-2': 1,
                    'incomeDesc|1': ['当前收益', '最新收益'],
                    'bankName|1':  ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
                    'status|1': ['00', '01', '02', '03'],
                    'fundInitCost': 1,
                    'fundPropertyState': [1, 2, 3, 4, 5, 6, 7, 8],
                    'propertyId|+1': 1,
                    'interestFlag|1': [0, 1]
                }]
            }
        }
    },

    // 定期类订单详情 productType = 0
    '/fp/user/fixedOrderDetail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'title': '计息中，300天后可以赎回',
            'productId|+1': 1,
            'productType': 0,
            'channelId|1': ['bsb', 'tfb'],
            'bankName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
            'name|1': ['财富走向 100天', '安心计划1年'],
            'interestRate|1': ['6.18%', '4.52%'],
            'duration|1': ['120天', '1年'],
            'investAmount|10000-99999.1-2': 1,
            'latestIncome|100-5000.1-2': 1,
            'totalIncome|100-5000.1-2': 1,
            'interestStartDate': '@date(yyyy.MM.dd)',
            'interestDay|1-365': 1,
            'interestEndDate': '@date(yyyy.MM.dd)',
            'tradeTime': '@date(yyyy.MM.dd)',
            'interestEndDay|1-100': 1,
            'repayLastdate': '@date(yyyy.MM.dd)',
            'chartData': {
                'data|30': [{
                  "yAxis|4.2": 4.1,
                  "xAxis": "@date(yyyy.MM.dd)"
                }],
                'tips': '近30天收益'
            },
            'cancelSupp|1': [0, 0, 1]
        }
    },
    // 定期类订单详情 productType = 0(API)
    '/fp/api/fixed/holdDetail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'title': '计息中，300天后可以赎回',
            'productId|+1': 1,
            'productType': 0,
            'channelId|1': ['bsb', 'tfb'],
            'bankName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
            'name|1': ['财富走向 100天', '安心计划1年'],
            'interestRate|1': ['6.18%', '4.52%'],
            'duration|1': ['120天', '1年'],
            'investAmount|10000-99999.1-2': 1,
            'latestIncome|100-5000.1-2': 1,
            'totalIncome|100-5000.1-2': 1,
            'interestStartDate': '@date(yyyy.MM.dd)',
            'interestDay|1-365': 1,
            'interestEndDate': '@date(yyyy.MM.dd)',
            'tradeTime': '@date(yyyy.MM.dd)',
            'interestEndDay|1-100': 1,
            'repayLastdate': '@date(yyyy.MM.dd)',
            'chartData': {
                'data|30': [{
                  "yAxis|4.2": 4.1,
                  "xAxis": "@date(yyyy.MM.dd)"
                }],
                'tips': '近30天收益'
            },
            'cancelSupp|1': [0, 1]
        }
    },

    // 存款类订单详情 productType = 1
    '/fp/user/depositOrderDetail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'product': {
                'title': '计息中，可提前取出',
                'productId|+1': 1,
                'productType': 1,
                'channelId|1': ['bsb', 'tfb'],
                'bankName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
                'name|1': ['财富走向 100天', '安心计划1年'],
                'interestRate|1': ['6.18%', '4.52%'],
                'duration|1': ['120天', '1年'],
                'investAmount|10000-99999.1-2': 1,
                'latestIncome|100-5000.1-2': 1,
                'status|1': ['0', '1', '2', '3']
            },
            'orders|1-3': [{
                'depositDate': '@date("yyyy.MM.dd")',
                'depositId|+1': 1,
                'callable|1': [0, 1],
                'showCall|1': [0, 1],
                'callDate': '@date("yyyy.MM.dd")',
                'depositedDayPercent_temp|1-100': 1,
                'depositedDayPercent': function() {
                    return this.depositedDayPercent_temp + '%'
                },
                'investAmount|10000-99999.1-2': 1,
                'interestEndDate': '@date("yyyy.MM.dd")',
                'latestIncome|100-5000.1-2': 1,
                'totalIncome|100-5000.1-2': 1,
                'cuusin_temp|1-10.1-2': 1,
                'cuusin': function() {
                    return this.cuusin_temp + '%'
                }
            }]
        }
    },

    // 货基类订单详情 productType = 2
    '/fp/user/fundOrderDetail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'product': {
                'title': '持有中,到期自动赎回',
                'productId|+1': 1,
                'productType': 1,
                'channelId|1': ['bsb', 'tfb'],
                'bankName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
                'name|1': ['财富走向 100天', '安邦安增益2号(第170904期)'],
                'interestRate|1': ['6.18%', '4.52%'],
                'duration|1': ['120天', '1年'],
                'investAmount|10000-99999.1-2': 1,
                'grandTotal|100-5000.1-2': 1,
                'status|1': ['0', '1', '2', '3'],
                'propertyState|1': [1,2,3,4,5,6,7,8]
            },
            'expireDeal': [{ 
                'id': 1,
                'title': '自动续期',
                'desc': '到期后本金和收益自动买入下一期，收益不间断',
                'checked': true
            }, {
                'id': 0,
                'title': '到期后赎回',
                'desc': '到期后本金和收益自动赎回到您的电子账户',
                'checked': false
            }],
            'profitDetail':{
                'hasMore': function() {
                    if (this.list.length > 0) {
                        return true;
                    }
                    return false;
                },
                'list|0-10': [{
                    'date':'@date(yyyy.MM.dd)',
                    'type':'收益',
                    'amount|1-10.1-2':1
                }]
            },
            'transRecord':{
                'list|0-10': [{
                    'transDate':'@date(yyyy.MM.dd)',
                    'transDesc_temp|100-1000000.1-2': 1,
                    'transDesc': function() {
                        return '买入'+ this.transDesc_temp +'元'
                    },
                    'transState|1': [0, 1, 2]
                }]
            }
        }
    },

    // 货基类订单详情(API) productType = 2
    '/fp/api/roll/holdDetail': {
        "resultCode": 0,
        "businessCode": "SUCCESS",
        "resultMsg": "操作成功",
        "resultData": {
                "product": {
                    "propertyState": 3,
                    "title": "持有中，到期买入下一期",
                    "duration": "7天",
                    "status": "1",
                    "channelId": "cmbc",
                    "name": "安邦安增益2号接口测试勿删",
                    "grandTotal": "13.00",
                    "bankName": "民生银行",
                    "investAmount": "1,000.00",
                    "interestRate": "4.32%",
                    "productId": "0000010888",
                    "productType": 2,
                    "isAbleChange|1": [0, 1]
                },
                'chartData': {
                    'data|30': [{
                      "yAxis|4.2": 4.1,
                      "xAxis": "@date(yyyy.MM.dd)"
                    }],
                    'tips': '近30天收益'
                },
                'expireDeal': [{ 
                    'id': 1,
                    'title': '到期买入下一期',
                    'desc': '2018年6月10日到期后自动买入下一期',
                    'checked': true
                }, {
                    'id': 0,
                    'title': '到期自动赎回',
                    'desc': '2018年6月10日到期后，资金自动赎回到电子账户',
                    'checked': false
                }]
            }
    },

    // 变更到期处理方式请求(API) productType = 2
    '/oc/roll/property/changeExpireHandleWay': {
        "resultCode": 0,
        "businessCode": "SUCCESS",
        "resultMsg": "操作成功",
        "resultData": {
            'handleWayDesc': '计息中，可提前取出'
        }
    },

    // 货基类订单详情 --- 收益明细 productType = 2
    '/fp/user/fundOrderProfit': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'hasMore': function() {
                if (this.list.length > 0) {
                    return true;
                }
                return false;
            },
            'list|0-10': [{
                'date':'@date(yyyy.MM.dd)',
                'type':'收益',
                'amount|1-10.1-2':1
            }]
        }
    },

    // 货基类订单详情(API) --- 收益明细 productType = 2
    '/fp/api/roll/rollOrderProfit': {
        "resultCode": 0,
        "businessCode": "SUCCESS",
        "resultMsg": "操作成功",
        "resultData": {
            'hasMore': function() {
                if (this.list.length > 5) {
                    return true;
                }
                return false;
            },
            'list|0-10': [{
                'date':'@date(yyyy.MM.dd)',
                'type':'收益',
                'amount|1-10.1-2':1
            }]
        }
    },

    // 保险类订单详情 - productType = 3
    '/fp/user/bankInsuranceDetail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            "productType": 3,
            'title': '持有中,到期自动赎回',
            'productId|+1': 1,
            'channelId|1': ['bsb', 'tfb'],
            'bankName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
            'name|1': ['财富走向 100天', '安邦安增益2号(第170904期)'],
            "interestRate":"4.5%",
            "investAmount":"1000.00",
            "todayIncome":"5.40",
            "totalIncome":"100.19",
            "interestStartDate":"@date(yyyy-MM-dd)",
            "orderId":"@id()",
            "policyNo":"@id()",
            "amount":"5000.00",
            "interestEndDate":"1年",
            "tradeTime":"@date(yyyy-MM-dd)",
            "redeemStatus|0-2": 1
        }
    },
    // 保险类订单详情(API) - productType = 3
    '/fp/api/insurance/holdDetail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            "productType": 3,
            'title': '持有中,到期自动赎回',
            'productId|+1': 1,
            'channelId|1': ['bsb', 'tfb'],
            'bankName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
            'name|1': ['财富走向 100天', '安邦安增益2号(第170904期)'],
            "interestRate":"4.5%",
            "investAmount":"1000.00",
            "todayIncome":"5.40",
            "totalIncome":"100.19",
            "interestStartDate":"@date(yyyy-MM-dd)",
            "orderId":"@id()",
            "policyNo":"@id()",
            "amount":"5000.00",
            "fee":"30.00",
            "feeTips":"保单生效后扣除0.3%的初始费用，犹豫期内赎回退还该费用。",
            'chartData': {
                'data|30': [{
                  "yAxis|4.2": 4.1,
                  "xAxis": "@date(yyyy.MM.dd)"
                }],
                'tips': '近30天收益'
            },
            "interestEndDate":"1年",
            "tradeTime":"@date(yyyy-MM-dd)",
            "redeemStatus|0-2": 1,
            "latestIncomeDate": "2018.03.30"
        }
    },
  
    // 定期可赎回类订单详情 productType = 6
    'fp/norm/fixedrdm/pay/detail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'title': '计息中，可提前取出',
            'channelName': '众邦银行',
            'productName': '众邦宝1个月',
            'productRate': {
              'name'     :'预期年化收益率',
              'value'    :'4.80%'
            },
            'duration'   : {
                'name'   :'产品期限',
                'value'  :'30天'
            },
            'status|1'    : [0,1,2,3],
            'investAmount': {
                'name'    :'投资金额(元)',
                'value'   :'100.00'
            },
            'currProfit'  : {
                'name'    :'当前收益(元)',
                'value'   :'+1.36'
            },
            'orderNum'    : '3213131',
            'orderStatus|1' : ['BUY_SUCCESS','购买失败'],
            'interestBDate' : {
                'name'      :'计息日期',
                'value'     :'2018-01-10'
            },
            'interestEDate' : {
                'name'      :'到期日期',
                'value'     :'2018-11-10'
            },
            'latestIncome'  : {
                'name'      :'最新收益',
                'value'     :'1.34'
            },
            'payback'       : {
                'name'      :'到期自动对付',
                'value'     :'本产品到期后自动兑付，存续期间支持提前赎回...'
            },
            'chartData': {
                'data|30': [{
                    "yAxis|1": [4.1, 0.00],
                    "xAxis": "@date(yyyy-MM-dd)"
                }],
                'tips': '近30天收益'
            },
            'checkRedeem': {
                'supp|1': [true, false],
                'desc': '支取处理中'
            }
        }
    },

    // 银行理财预约提醒
    '/fp/user/appoint': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'appoint|1': [0, 1]
        }
    },
    '/fp/api/bespeak/appoint': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'appoint|1': [0, 1]
        }
    },

    // 预约提醒
    '/fp/user/operreminder': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'title': '预约成功',
            'tipMsg': '下一波天府银行资产售卖时，系统将会给您发送消息，请保持关注。'
        }
    },

    // 银行+交易列表
    '/fw/trade/page': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'hasMore': function() {
                if (this.list.length > 0) {
                    return true;
                }
                return false;
            },
            'list|0-3': [{
                'bankName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行'],
                'productName|1': ['财富走向 100天', '安心计划1年'],
                'tradeType|1': [0, 1, 2],
                'tradeId|+1': 1,
                'tradeAmount|10000-100000.1-2': 1,
                'tradeDate': '@date(yyyy-MM-dd hh:mm:ss)',
                'status|1': ['01', '00'] // 00成功, 01失败
            }]
        }
    },

    // 银行+交易详情
    '/fw/trade/detail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'amount|1000-10000.2': 1,
            'status|1': ['00', '01'],
            'tradeType|1': [0, 1, 2],
            'detail':[{
                'name': '转账至',
                'value': 'E票通【BJ201781322】'
            }, {
                'name': '银行名称',
                'value': '包商银行'
            }, {
                'name': '买入金额',
                'value': '12000.00 元'
            }, {
                'name': '下单时间',
                'value': '2017-08-10 12:03:11'
            }, {
                'name': '买入单号',
                'value': '2929183747237372272'
            }]
        }
    },

    // 银行+近一月七日年化-近一月万份收益
    '/fp/product/yearOrtenthouRate': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'list|7-30':[{
                'day': '@date(yyyy-MM-dd)',
                'rate_temp|1-20.2': 1,
                'rate': function() {
                    return this.rate_temp + '%'
                }
            }]
        }
    },

    // 银行+电子账户列表
    '/fp/user/bankElecAcctList': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'tip': '天府银行电子账户余额需到电子账户信息管理页查看',
            'list|0-10': [{
                'channelId|1':  ['bsb', 'tfb'],
                'channelIcon|1': ['https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/spdb.png', 'https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/tfb.png', 'https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/bsb.png', 'https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/cmbc.png'],
                'channelName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行'],
                'openDate': '@date(yyyy.MM.dd)',
                'realName': '@cname()',
                'bankAccountId': 1234,
                'balance|1': [100.00,null,''],
                'background|1': ['red', 'blue', 'gray'],
                'jumpVersion|1': [0, 1]
            }]
        }
    },




    // 行家首页
    '/fp/expert/home': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'banner': {
                'pool|1-3': [{
                    'linkUrl': 'https://qianbao.jd.com/p/page/RNdK4366a0ca.htm',
                    'h5ImageUrl': '@image("750x170")',
                }]
            },
            'channelList|0-9': [{
                'channelName|1':  ['招商银行','建设银行','工商银行','交通银行','中国银行'],
                'channelIcon': '@image(56x56)',
                'channelId|+1': 1,
                'expertUid|+1': 1,
                'jdpin|+1': 1
            }],
            'productList': [{
                'channelId': 'spdb',
                'productId|1-100': 1,
                'interestRate': '6.18',
                'productText': '财富走向 100天',
                'duration': '投资期限120天',
                'channelName|1':  ['招商银行','建设银行','工商银行','交通银行','中国银行'],
                'minInvestAmount|1-10': 1
            },{
                'channelId': 'tfb',
                'productId|1-100': 1,
                'interestRate': '6.18',
                'productText': '财富走向 100天',
                'duration': '投资期限120天',
                'channelName|1':  ['招商银行','建设银行','工商银行','交通银行','中国银行'],
                'minInvestAmount|1-10': 1
            },{
                'channelId': 'tfb',
                'productId|1-100': 1,
                'interestRate': '6.18',
                'productText': '财富走向 100天',
                'duration': '投资期限120天',
                'channelName|1':  ['招商银行','建设银行','工商银行','交通银行','中国银行'],
                'minInvestAmount|1-10': 1
            }]
        }
    },

    // 产品列表
    '/fw/product/channelList': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'banner': {
                'pool|1-3': [{
                    'linkUrl': 'https://qianbao.jd.com/p/page/RNdK4366a0ca.htm',
                    'h5ImageUrl': '//img11.360buyimg.com/wympay/jfs/t5803/326/6006872961/49440/2a85329b/59672419N4366a7df.jpg',
                }]
            },
            'page': {
                'hasMore': function() {
                    if (this.list.length > 0) {
                        return true;
                    }
                    return false;
                },
                'list|0-6': [{
                    'bankName|1': ['招商银行','工商银行','建设银行'],
                    'productId|+1': 1,
                    'productType|1': [0, 1],
                    'productText|1': ['财富走向 100天', '安心计划1年'],
                    'tips|0-1': ['高收益', '综合年化6.15%'],
                    'interestRate|1': ['6.18%', '4.52%'],
                    'duration|1': ['120天', '1年'],
                    'minInvestAmount|1': ['5万', '10万'],
                    'status|0-4': 0,
                    'statusDesc': '123'
                }]
            }
        }
    },

    // 我的资产
    '/fp/user/serviceNo/home': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'header': {
                'investAmount|10000-99999.1-2': 1,
                'expectIncome|100-5000.1-2': 1,
                'honoredIncome|10000-50000.1-2': 1
            },
            'page': {
                'hasMore': function() {
                    if (this.list.length > 0) {
                        return true;
                    }
                    return false;
                },
                'list|0-9': [{
                    'orderId|+1': 1,
                    'name|1': ['财富走向 100天', '安心计划1年'],
                    'day': '@date("yyyy.MM.dd")',
                    'amount|10000-99999.1-2': 1,
                    'income|100-999.1-2': 1,
                    'incomeDesc|1': ['预估收益(元)', '回款收益(元)']
                }]
            }
        }
    },

    // 订单订情
    '/fp/user/serviceNo/orderDetail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'amount|10000-99999.1-2': 1,
            'status|0-4': 1,
            'detail': [{
                'name': '产品名称',
                'value': '恒丰永盈1号'
            }, {
                'name': '产品收益',
                'value': '5.30%'
            }, {
                'name': '订单号',
                'value': '123912921387837272272'
            },{
                'name': '订单时间',
                'value': '2017-05-02 10:00:23'
            }, {
                'name': '支付时间',
                'value':'2017-05-02 10:00:23'
            }]
        }
    },

    // 项目说明
    'fp/product/furtherDetail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData|0-5':  [{
            'title': '资产权益转让人情况',
            'items': [{
                'name': '产品名称',
                'value': '恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号恒丰永盈号'
            }, {
                'name': '产品收益',
                'value': '5.30%',
                'style':'yellow'
            }, {
                'name': '订单号',
                'value': '123912921387837272272'
            },{
                'name': '订单时间订单时间订单时间订单时间',
                'value': '2017-05-02 10:00:23'
            }, {
                'name': '支付时间',
                'value':'2017-05-02 10:00:23'
            }, {
                'name': '',
                'value': [{
                    name: '票据真实1',
                    value: '订单时间订单时间订单时间订单时间订单时间订单时间订单时间订单时间订单时间订单时间订单时间订单时间订单时间订单时间订单时间订单时间订单时间订单时间订单时间订单时间'
                },{
                    name: '票据真实2',
                    value: 0
                }],
                'style':'radio'
            }, {
                'name': '订单时间',
                'value': '2017-05-02 10:00:23'
            }, {
                'name': '支付时间',
                'value':'2017-05-02 10:00:23'
            }]
        }]
    },

    // 购买前置检查
    '/fp/product/serviceNo/buyPreCheck': {
        'resultCode|0-1': 1,
        'resultMsg': function() {
            if (this.resultCode === 1) {
                return '此产品不可购买'
            }
        },
        'resultData': {
            'checkIndex|0-3': 0
        }
    },

    // 开户流程-选择银行卡
    '/fp/user/serviceNo/selectBankcard': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'bindCardUrl': 'https://msc.jd.com/card/loginpage/wcoo/toAddNewCardPage?source=1&sid=&bizType=34',
            'channelName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
            'list|2-10': [{
                'id|+1': 1,
                'bankName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
                'bankLogo|1': ['https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/spdb.png', 'https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/tfb.png', 'https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/bsb.png', 'https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/cmbc.png'],
                'cardUser': '@cname()',
                'cardNum|1000-9999': 1000
            }]
        }
    },

    // 开户流程-支持银行卡
    '/fp/user/serviceNo/supportBank': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'list|0-5': [{
                'id|+1': 1,
                'bankName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
                'bankLogo|1': ['https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/spdb.png', 'https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/tfb.png', 'https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/bsb.png', 'https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/cmbc.png']
            }]
        }
    },

    // 开户流程-上传身份证
    '/fp/image/idCardVerify': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {}
    },

    // 开户流程-身份证识别
    '/fp/image/idCardAuth': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {}
    },

    // 开户流程-上传身份证
    '/fp/api/image/apiIdCardVerify': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {}
    },

    // 开户流程-身份证识别
    '/fp/api/image/apiIdCardAuth': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {}
    },



    // 获取开户银行名称(API)
    '/fp/api/bank/getChannelName': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行']
        }
    },

    // 完善开户信息初始化(API)
    '/fp/api/bank/getOpenAccountInfo': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
            'channelLogo': '@image(80x80)',
            'cardHolder': '@cname()',
            'idCardNum': '3408922 **** 3445',
            'idCardAuth|1': true,
            'bankList': [{
                'bankName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
                'bankLogo': '@image(80x80)',
                'bankCardNum|1000-9999': 1000,
                'bankCardId|+1': 1,
                'holderPhone': '138 **** 7574',
                'singleLimit': ['单笔限额2万,', 20000.00],
                'dailyLimit': ['单日限额5万', 50000.00],
                'support': 0
            }, {
                'bankName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
                'bankLogo': '@image(80x80)',
                'bankCardNum|1000-9999': 1000,
                'bankCardId|+1': 1,
                'holderPhone': '138 **** 7574',
                'singleLimit': ['单笔限额2万,', 20000.00],
                'dailyLimit': ['单日限额5万', 50000.00],
                'support': 1
            }, {
                'bankName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
                'bankLogo': '@image(80x80)',
                'bankCardNum|1000-9999': 1000,
                'bankCardId|+1': 1,
                'holderPhone': '138 **** 7574',
                'singleLimit': ['单笔限额2万,', 20000.00],
                'dailyLimit': ['单日限额5万', 50000.00],
                'support': 1
            }],
            'protocol|0-2': [{
                'name': '南京银行电子账户开户协议',
                'url': '//m.jd.com'
            }]
        }
    },

    // 获取验证码(API)
    '/fp/api/bank/getVcode': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'serialno': '@id()'
        }
    },

    // 确认开户(API)
    'fp/api/bank/openAccount': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
            'bankCardNum': '6223 3030 2228 2228 281'
        }
    },

    // 检查用户是否授权(API)
    'fp/api/bank/userCheck':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'code|1': [1,2,3,3,3,3,3,3,4],
            'url': 'https://m.jr.jd.com/statics/jmstatics/mq/auth/html/index.html?appid=JD0000176&scope=base&type=1&redirect_uri=',
            'redirect_uri': 'https://bankplus-s-beta.jd.com/fp/api/serviceNo/callback4Auth?channelId=bon'
        }
    },
    
    // 检查用户是否授权(新账户）
    'oasis/open/check': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'code|1': [1,2,3,3,3,3,3,3,4],
            'url': 'https://m.jr.jd.com/statics/jmstatics/mq/auth/html/index.html?appid=JD0000176&scope=base&type=1&redirect_uri=',
            'redirect_uri': 'https://bankplus-s-beta.jd.com/fp/api/serviceNo/callback4Auth?channelId=bon'
        }
    },

    // 电子账户(API)
    'fp/api/bank/getElecAccountInfo': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
            'accountBalance': 5000.00,
            'idCardAuth': false,
            'changeCardEnabled|0-1': 0,
            'changePhoneEnabled|0-1': 0,
            'elecAccountNum': '4373 7372 2727 8484 123',
            'bindBankName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
            'binkCardNum': 2122,
            'reservedPhone': '138 *** 5585',
            'freezingAmount|1000-9999.1-2': 1000,
            'exceptionCode|1': ['BANKCARD_CHANNGE_OTHER_CHANNEL','BANKCARD_CHANNGE_ZERO_ASSET',''],
            'exceptionMsg':'1111'
        }
    },

    // 存款类产品购买初始化(API)
    'fp/api/deposit/initOrderPage':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'productRateDesc'  : '储蓄利率',
            'channelName'      : '民生银行',
            'productName'      : '安邦安增益2号',
            'surplusAmount|1'  : [250050.00],
            'surplusDesc'      : '剩余可购金额 250,050.00 元',
            'expectedYieldRate': '4.54%',
            'paymentAmountDesc': '1000元起投,100元递增',
            'minInvestAmount'  : 1000.00,
            'insuranceAmount'  : 0.02,
            'elecAccountNum'   : 1939,
            'availableBalance' : 50000.00,
            'availableDes'     : '50,000.00',
            'phoneNumber'      : '158 **** 3152',
            'stateDesc'        : '资产已经售罄',
            'protocol|0-1'         : [{
                'name'         : '平台产品购买服务协议',
                'url'          : 'http://dev.jdpay.com/protocol'
            }, {
                'name'         : '南京银行产品购买服务协议',
                'url'          : 'https://www.nihaobank.com/newdirectbank/BillsAgreement.do?_locale=zh_CN&ProductId=2018020652679886'
            }],
            'buyExplain'       : '<p>购买说明：</p><p>1.购买时银行会冻结相应的电子账户金额，待最终募集成功后再进行扣减；</p><p>2.由于产品线上售卖较火爆，最终购买成功金额以银行系统实际处理结果为准。</p>'
        }
    },
    'fp/savings/order/init':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName'      : '民生银行',
            'productName'      : '安邦安增益2号',
            'surplusAmount|1'  : [250050.00],
            'surplusDesc'      : '剩余可购金额 250,050.00 元',
            'expectedYieldRate': '4.54%',
            'paymentAmountDesc': '1000元起投,100元递增',
            'minInvestAmount'  : 1000.00,
            'insuranceAmount'  : 0.02,
            'elecAccountNum'   : 1939,
            'availableBalance' : 50000.00,
            'availableDes'     : '50,000.00',
            'phoneNumber'      : '158 **** 3152',
            'stateDesc'        : '资产已经售罄',
            'protocol|0-1'         : [{
                'name'         : '平台产品购买服务协议',
                'url'          : 'http://dev.jdpay.com/protocol'
            }, {
                'name'         : '南京银行产品购买服务协议',
                'url'          : 'https://www.nihaobank.com/newdirectbank/BillsAgreement.do?_locale=zh_CN&ProductId=2018020652679886'
            }],
            'buyExplain'       : '<p>购买说明：</p><p>1.购买时银行会冻结相应的电子账户金额，待最终募集成功后再进行扣减；</p><p>2.由于产品线上售卖较火爆，最终购买成功金额以银行系统实际处理结果为准。</p>'
        }
    },

    // 定期理财购买初始化(API)
    'fp/api/payment/init2':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            "buyIncomeDesc": "15:00之前购买，预计01.14开始计息，01.15可查看收益",
            "channelName": "民生银行",
            "elecAccBalance": "0.00",
            "elecAccLabel": "农业银行电子账户(6678)",
            "expireHandleWay": {
                "text": "到期处理方式",
                "desc": "到期处理方式的描述",
                "options": [{
                    "desc": "到期后本金和收益自动赎回到您的电子户",
                    "name": "到期后自动赎回",
                    "selected": true,
                    "value": "1"
                },
                {
                    "desc": "到期后本金和收益自动买入下一期",
                    "name": "自动续期",
                    "selected": false,
                    "value": "2"
                }]
            },
            "increaseAmount": "1",
            "interestRate": {
                "name": "七日年化利率",
                "value": "1.9%"
            },
            "investMinAmount": "10",
            "productBalance": "19000",
            "productName": "民生宝",
            "productRate": {
                "name": "万份收益",
                "value": "1"
            },
            "riskLevel": "A"
        }
    },

    // 定期理财购买初始化(API)
    'fp/api/payment/init':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName'      : '民生银行',
            'productName'      : '安邦安增益2号',
            'surplusAmount|1'  : [250050.00],
            'surplusDesc'      : '剩余可购金额 250,050.00 元',
            'expectedYieldRate': '4.54%',
            'paymentAmountDesc': '1000元起投,100元递增',
            'minInvestAmount'  : 1000.00,
            'insuranceAmount'  : 100.00,
            'elecAccountNum'   : 1939,
            'availableBalance' : 50000.00,
            'availableDes'     : '50,000.00',
            'profit'           : '预期可得收益<span>230.33</span>元',
            'phoneNumber'      : '158 **** 3152',
            'productState'     : 1,
            'riskLevelName'         : '稳健型',
            'isNeedPreCheck|1' : [true,false],
            'stateDesc'        : '资产已经售罄',
            'protocol'         : [{
                'name'         : '平台产品购买服务协议',
                'url'          : 'http://dev.jdpay.com/agreement/tjbhb/3?a=1'
            }, {
                'name'         : '南京银行产品购买服务协议',
                'url'          : 'https://www.nihaobank.com/newdirectbank/BillsAgreement.do?_locale=zh_CN&ProductId=2018020652679886'
            }],
            'buyExplain'       : '<p>购买说明：</p><p>1.购买时银行会冻结相应的电子账户金额，待最终募集成功后再进行扣减；</p><p>2.由于产品线上售卖较火爆，最终购买成功金额以银行系统实际处理结果为准。</p>',
            'interestRateExpect'     : '5.2513%',
            'shareIncome'      : '1.3120',
            'incomeDesc'       : '15:00之前购买，预计01.14开始计息，01.15可查看收益',
            'expireDeal'       : [{
                'id'           : 1,
                'title'        : '自动续期',
                'desc'         : '到期后本金和收益自动买入下一期，收益不间断',
                'checked'      : true
            },{
                'id'           : 10,
                'title'        : '自动',
                'desc'         : '到期后本金和收益自动买入下一期，收益不间断',
                'checked'      : false
            },{
                'id'           : 0,
                'title'        : '到期后赎回',
                'desc'         : '到期后本金和收益自动赎回到您的电子账户',
                'checked'      : false
            }],
            'buyTime|1'        : [0,1],
            'expireDesc'       : '同一交易日购买的订单到期处理方式需保持一致，后续可在资产持仓页进行修改'
        }
    },

    // 保险购买初始化(API)
    'fp/api/insurancePayment/init':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName'      : '民生银行',
            'productName'      : '安邦安增益2号',
            'surplusAmount|1'  : [250050.00],
            'surplusDesc'      : '剩余可购金额 250,050.00 元',
            'expectedYieldRate': '4.54%',
            'paymentAmountDesc': '1000元起投,100元递增',
            'minInvestAmount'  : 1000.00,
            'insuranceAmount'  : 100.00,
            'elecAccountNum'   : 1939,
            'availableBalance' : 50000.00,
            'availableDes'     : '50,000.00',
            'profit'           : '预期可得收益<span>230.33</span>元',
            'phoneNumber'      : '158 **** 3152',
            'productState'     : 1,
            'riskLevelName'    : '稳健型',
            'isNeedPreCheck|1' : [true,false],
            'stateDesc'        : '资产已经售罄',
            'protocol'         : [{
                'name'         : '平台产品购买服务协议',
                'url'          : 'https://www.jd.com?t=111'
            }, {
                'name'         : '南京银行产品购买服务协议',
                'url'          : 'https://www.nihaobank.com/newdirectbank/BillsAgreement.do?_locale=zh_CN&ProductId=2018020652679886'
            }]
        }
    },

    // 结构化存款购买初始化(API)
    'fp/api/structured/deposit/initOrderPage': {
        "resultCode": 0,
        "businessCode": "SUCCESS",
        "resultMsg": "操作成功",
        "resultData": {
            "protocol": [
                {
                  "name": "京东金融银行业开放平台服务协议",
                  "url": "https://bankplus-s-beta-02.jd.com/fp/h5/protocol"
                }
            ],
            "channelName": "蓝海银行",
            "surplusAmount": 99834461,
            "bankIcon": "https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/bob.png",
            "elecAccountNum": "9297",
            "expectedYieldRate": "165.00%",
            "paymentAmountDesc": "1,000元起投, 1元递增",
            "availableBalance": 36466.54,
            "surplusDesc": "2018年04月21日开始计息，到期自动赎回",
            "buyExplain": null,
            "productState": 1,
            "productType": 5,
            "availableDes": "36,466.54",
            "stateDesc": "",
            "phoneNumber": "133 **** 1126",
            "insuranceAmount": 1,
            "minInvestAmount": 1000,
            "productName": "结构性存款807期渠道端测试用-长募集期"
        }
    },
  
    // 定期可赎回购买初始化(API)
    'fp/norm/fixedrdm/pay/init': {
        "resultCode": 0,
        "businessCode": "SUCCESS",
        "resultMsg": "操作成功",
        "resultData": {
            "protocol": [
                {
                    "name": "京东金融银行业开放平台服务协议",
                    "url": "https://bankplus-s-beta-02.jd.com/fp/h5/protocol"
                },
                {
                    "name": "购买协议",
                    "url": "http://dev.jdpay.com/agreement/whzb/1?channelId=whzb"
                }
            ],
            "channelName": "蓝海银行",
            "surplusAmount": 99834461,
            "elecAccountNum": "9297",
            "productRate": {
                'name': '期满综合利率',
                'value': '4.80%'
            },
            "paymentAmountDesc": "1,000元起投, 1元递增",
            "availableBalance": 36466.54,
            "surplusDesc": "2018年04月21日开始计息，到期自动赎回",
            "buyExplain": null,
            "productState": 1,
            "productType": 6,
            "availableDes": "36,466.54",
            "stateDesc": "",
            "phoneNumber": "133 **** 1126",
            "insuranceAmount": 1,
            "minInvestAmount": 1000,
            "productName": "结构性存款807期渠道端测试用-长募集期"
        }
    },
  
    //定期可赎回预期收益(API)
    'fp/norm/fixedrdm/pay/profit':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'expectedReturn': '预期可得收益<span>230.33</span>元'
        }
    },

    //预期收益(API)
    'fp/api/payment/profit':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'expectedReturn': '预期可得收益<span>230.33</span>元'
        }
    },


    //预期收益(API)
    'fp/api/deposit/expectProfit':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'expectedReturn': '预期可得收益<span>230.33</span>元'
        }
    },
    'sf/savings/order/profit/expect':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'expectedReturn': '预期可得收益<span>230.33</span>元'
        }
    },

    // 定期类产品购买结果(API)
    'fp/api/payment/submit':{
        'resultCode': 0,
        'businessCode|1': ['ACC_0001','PRO_0004','PRO_0001',''],
        'resultMsg': '购买失败购买失败购买失败购买失败购买失败购买失败',
        'resultData': {
            'list': [{
                'desc' :  '成功购买5000.00元',
                'tips' :  '银行处理可能有延迟，请关注资产变化'
            }, {
                'desc' :  '2016-10-27开始产生收益'
            }, {
                'desc' :  '2017-10-27 结息',
                'tips' :  '到账时间一般在结息日后1-3个工作日，实际到账时间以银行最终处理时间为准'
            }],
            'banner': {
                'pool|0-3': [{
                    'linkUrl': 'https://qianbao.jd.com/p/page/RNdK4366a0ca.htm',
                    'h5ImageUrl': '@image("750x170", "#894FC4", "#FFF")',
                }]
            }
        }
    },

    // 存款类产品购买结果(API)
    'fp/api/deposit/submitOrdert':{
        'resultCode': 0,
        'businessCode|1': ['ACC_0001','PRO_0004','PRO_0001',''],
        'resultMsg': '购买失败购买失败购买失败购买失败购买失败购买失败',
        'resultData': {
            'list': [{
                'desc' :  '成功购买5000.00元',
                'tips' :  '银行处理可能有延迟，请关注资产变化'
            }, {
                'desc' :  '2016-10-27开始产生收益'
            }, {
                'desc' :  '2017-10-27 结息',
                'tips' :  '到账时间一般在结息日后1-3个工作日，实际到账时间以银行最终处理时间为准'
            }],
            "banner": {
                "pool|0-3": [{
                    "linkUrl": "https://qianbao.jd.com/p/page/RNdK4366a0ca.htm",
                    "h5ImageUrl": '@image("750x170", "#894FC4", "#FFF")',
                }]
            }
        }
    },
    'sf/savings/order/apply':{
        'resultCode': 0,
        'businessCode|1': ['ACC_0001','PRO_0004','PRO_0001',''],
        'resultMsg': '购买失败购买失败购买失败购买失败购买失败购买失败',
        'resultData': {
            'list': [{
                'desc' :  '成功购买5000.00元',
                'tips' :  '银行处理可能有延迟，请关注资产变化'
            }, {
                'desc' :  '2016-10-27开始产生收益'
            }, {
                'desc' :  '2017-10-27 结息',
                'tips' :  '到账时间一般在结息日后1-3个工作日，实际到账时间以银行最终处理时间为准'
            }],
            "banner": {
                "pool|0-3": [{
                    "linkUrl": "https://qianbao.jd.com/p/page/RNdK4366a0ca.htm",
                    "h5ImageUrl": '@image("750x170", "#894FC4", "#FFF")',
                }]
            }
        }
    },
  
    //定期可赎回创建购买订单
    'fp/norm/fixedrdm/pay/createOrder':{
        'resultCode': 0,
        'businessCode|1': ['ACC_0001','PRO_0004','PRO_0001',''],
        'resultMsg': '购买失败购买失败购买失败购买失败购买失败购买失败',
        'resultData': {
            'orderNum'    : '100001',
            'telephone'   : '138 **** 2222'
        }
    },
  
    //定期可赎回发送验证码
    'fp/norm/fixedrdm/pay/verifyCode':{
        'resultCode': 0,
        'businessCode|1': ['ACC_0001','PRO_0004','PRO_0001',''],
        'resultMsg': '购买失败购买失败购买失败购买失败购买失败购买失败',
        'resultData': {
            'serialNo': '218381217271172'
        }
    },
  
    // 定期可赎回产品购买结果(API)
    'fp/norm/fixedrdm/pay/verifySubmit':{
        'resultCode': 0,
        'businessCode|1': ['ACC_0001','PRO_0004','PRO_0001',''],
        'resultMsg': '购买失败购买失败购买失败购买失败购买失败购买失败',
        'resultData': {
            'list': [{
                'desc' :  '成功购买5000.00元',
                'tips' :  '银行处理可能有延迟，请关注资产变化'
            }, {
                'desc' :  '2016-10-27开始产生收益'
            }, {
                'desc' :  '2017-10-27 结息',
                'tips' :  '到账时间一般在结息日后1-3个工作日，实际到账时间以银行最终处理时间为准'
            }],
            'banner': {
                'pool|0-3': [{
                    'linkUrl': 'https://qianbao.jd.com/p/page/RNdK4366a0ca.htm',
                    'h5ImageUrl': '@image("750x170", "#894FC4", "#FFF")',
                }]
            }
        }
    },
    
    //定期可赎回检查是否在赎回中
    'fp/norm/fixedrdm/redeem/check':{
        'resultCode': 0,
            'businessCode|1': ['ACC_0001','PRO_0004','PRO_0001',''],
            'resultMsg': '',
            'resultData': {
                'status|1': ['REDEEM_PROCESS', 'BUY_PROCESS']
        }
    },

    //充值初始化(API)
    'fp/api/bank/getElecAccountRechargeInfo':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName'      : '招商银行',
            'elecAccountNum'   : '4373 7372 2727 8484 123',
            'bankName'         : '招商银行',
            'bankIcon'         : '@image(80x80)',
            'bankCardNum'      : 2233,
            'rechargelimitAmount': '20',
            'rechargelimitDesc':'充值金额10元起',
            'singleLimit'      : ['单笔限额1万，','infinity'],
            'dailyLimit'       : ['单日限额5万',50000.00],
            'background|1'     : ['red', 'blue', 'gray'],
            'accountBalance'   : '15,000.00',
            'phoneNumber'      : '158 **** 3152'
        }
    },

    //去充值(API)
    'fp/api/bank/elecAccountRechargeConfirm':{
        'resultCode|1': [0,-1],
        'businessCode': 'HANDLE_CODE_ERROR',
        'resultMsg': 'wwwwww',
        'resultData': {

        }
    },

    //提现初始化接口(API)
    'fp/api/bank/getElecAccountWithdrawInfo':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'accountNum'       : 999.99,
            'bankName'         : '招商银行' ,
            'bankIcon'         : '@image(80x80)',
            'bankCardNum'      : 2233,
            'cardLimit'        : 1000.00,
            'cardLimitDesc'    : '单笔限额5万元',
            'phoneNumber'      : '158 **** 3152',
            'elecAccountNum'   : '4373 7372 2727 8484 123',
            'background|1'     : ['red', 'blue', 'gray'],
            'singleLimit'      : ['单笔限额1万，','0'],
            'accountBalance'   : '15,000.00',
            'channelName'      : '包商银行'
        }
    },


    //去提现(API)
    'fp/api/bank/elecAccountWithdrawConfirm':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {

        }
    },

    'fp/api/bank/transactionRecord': {
        'resultCode': 0,
        'businessCode': 'SUCCESS',
        'resultMsg': '操作成功',
        'resultData': {
            hasMore: function() {
                if (this.list.length === 0) {
                    return false;
                }
                else {
                    return true;
                }
            },
            'list|0-5': [{
                'id|+1': 1,
                'tradeType|1': [-1, 1],
                'orderNo': '@id()',
                'orderType|1': ['提现','充值','回款'],
                'tradeTime': '@date(yyyy-MM-dd hh:mm:ss)',
                'tradeResult|1': ['交易成功', '交易失败'],
                'tradeDesc': '南京银行(0303)付款',
                'tradeAmount|1000-9999.1-2': 1,
            }]
        }
    },
    // 更换绑定卡初始化(API)
    '/fp/api/bank/getSwitchCardInfo': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
            'bankName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
            'bankLogo': '@image(80x80)',
            'cardNum|1000-9999': 1000,
            'bindCardUrl': 'https://msc.jd.com/card/loginpage/wcoo/toAddNewCardPage?source=1&sid=&bizType=34',
            'bankList': [{
                'bankName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
                'bankLogo': '@image(80x80)',
                'bankCardNum|1000-9999': 1000,
                'bankCardId|+1': 1,
                'holderPhone': '138 **** 7574',
                'singleLimit': ['单笔限额2万,', 20000.00],
                'dailyLimit': ['单日限额5万', 50000.00],
                'support': 1
            }, {
              'bankName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
              'bankLogo': '@image(80x80)',
              'bankCardNum|1000-9999': 1000,
              'bankCardId|+1': 1,
              'holderPhone': '138 **** 7574',
              'singleLimit': ['单笔限额2万,', 20000.00],
              'dailyLimit': ['单日限额5万', 50000.00],
              'support': 0
            }],
            'exceptionCode|1' : ['','','','BANKCARD_CHANNGE_ZERO_ASSET','BANKCARD_CHANNGE_OTHER_CHANNEL'],
            'exceptionMsg'    : '异常'
        }
    },
    // 更换绑定卡(API)
    '/fp/api/bank/switchCard': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
        }
    },
    // 协议内容带入(API)
    '/fp/protocol/fixed/product': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': [
            '2429847234112321',
            '大写金额',
            [1,2,3,4,5,6]
        ]
    },
    //赎回初始化（api）
    'fp/api/insuranceRedeem/init': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName': '江南农商',
            'productName': '产品名称',
            'phoneNumber': '15250997876',
            'elecAccountNum': '1525',
            'tips': '<p>赎回说明:</p><p>1.犹豫期内赎回无收益，返回初始费用。 犹豫期外赎回会扣除退保手续费和初始费用。到期后赎回会扣除初始费用，不收取退保手续费。</p><p>2.若有未付收益，则实际到账金额会比页面展示的到账金额多，最终以银行实际到账金额为准。</p>',
            'productDetail'    : [
               {   'name'     : '保单金额(元)',
                   'value'    : '10,000.00'
               },{
                   'name'     : '手续费(元)',
                   'value'    : '4.70%'
               },{
                   'name'     : '预计到账金额(元)',
                   'value'    : '120.45'
               }
            ]
        }
    },
    //定期可赎回-赎回初始化（api）
    'fp/norm/fixedrdm/redeem/init': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName': '江南农商',
            'productName': '产品名称',
            'phoneNumber': '15250997876',
            'elecAccountNum': '1525',
            'totalAmount': '200',
            'accountAmount': '198',
            'tips': '<p>赎回说明:</p><p>1.犹豫期内赎回无收益，返回初始费用。 犹豫期外赎回会扣除退保手续费和初始费用。到期后赎回会扣除初始费用，不收取退保手续费。</p><p>2.若有未付收益，则实际到账金额会比页面展示的到账金额多，最终以银行实际到账金额为准。</p>',
            'productDetail'    : [
                {   'name'     : '保单金额(元)',
                    'value'    : '10,000.00'
                },{
                    'name'     : '手续费(元)',
                    'value'    : '4.70%'
                },{
                    'name'     : '预计到账金额(元)',
                    'value'    : '120.45'
                }
            ],
            'protocol': [{
                'name': '协议',
                'url': ''
            }]
        }
    },
    //定期可赎回-创建订单（api）
    'fp/norm/fixedrdm/redeem/createOrder': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'orderNum'    : '100001',
            'telephone'   : '138 **** 2222'
        }
    },
    //定期可赎回-发短信（api）
    'fp/norm/fixedrdm/redeem/verifyCode': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'serialNo': '218381217271172'
        }
    },
    //定期可赎回-赎回结果（api）
    'fp/norm/fixedrdm/redeem/verifySubmit': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'resultCode': 0,
            'resultMsg': '',
            'resultData': {
                "resultDetail": "资金预计5分钟至24小时内转入电子账户",
                "resultDesc": "取出成功",
                "banner": {
                    "id": 128,
                    "pool": [{
                        "validityTimeBegin": 1517760000000,
                        "id": 195,
                        "sort": 1,
                        "linkUrl": "http://www.jd.com",
                        "imageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "cityName": "全国",
                        "validityTimeEnd": 1549296000000,
                        "h5ImageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "httpsImageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "adName": "开户完成1",
                        "city": 0
                    },{
                        "validityTimeBegin": 1517760000000,
                        "id": 195,
                        "sort": 1,
                        "linkUrl": "http://www.jd.com",
                        "imageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "cityName": "全国",
                        "validityTimeEnd": 1549296000000,
                        "h5ImageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "httpsImageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "adName": "开户完成1",
                        "city": 0
                    }],
                    "adpic": [
            
                    ],
                    "timing": 3,
                    "playingOrder": 1,
                    "city": 0
                }
            }
        }
    },
    //填写信息
    'fp/api/insurancePayment/getPayInfo': {
        'resultCode': 0,
        'resultMsg': '',
        "resultData":{
            "fee":"3",
            "channelName":"江南农商",
            "price":"1000.00",
            "userInfo":{
                "id":"20170901786099300000259392",
                "idNo":"140121198801147614",
                "area":[{
                    "code":"1",
                    "name":"2"
                }],
                "email":"1111@qq.com",
                "name":"小姐姐",
                "addr":"某某乡某某街001号"
            },
            "productName":"安溢保"
        }
    },
    //选择省市
    'fp/api/insurancePayment/getArea': {
        'resultCode': 0,
        'resultMsg': '',
        "resultData":{
            'area|2-10'    : [{
                'name|1': ['南京','苏州','淮安','郑州','武汉','上海'],
                'code|1': ['333020','1','2']
            }]
        }
    },

    // 存款类产品取出初始化(API)
    '/fp/api/deposit/redemption/init': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName|1'    : ['富民银行','长江银行','蓝海银行'],
            'productName'      : '富民宝',
            'elecAccountNum'    : '5608',
            'tradeAmount': '100000.00',
            'daysOfInterest': 1,
            'minInvestAmount': '50.00',
            'partRedemption': true,
            'rate': '4.70%',
            'productDetail'    : [{
                'name'         : '持有金额(元)',
                'value'        : '10,000.00'
            },{
                'name'         : '今日支取利率',
                'value'        : '4.70%'
            },{
                'name'         : '利息金额(元)',
                'value'        : '120.45'
            },{
                'name'         : '到账金额(元)',
                'value'        : '10,120.45'
            }],
            'protocol'         : [{
                'name'         : '平台产品购买服务协议',
                'url'          : 'https://www.jd.com?t=111'
            }, {
                'name'         : '南京银行产品购买服务协议',
                'url'          : 'https://www.nihaobank.com/newdirectbank/BillsAgreement.do?_locale=zh_CN&ProductId=2018020652679886'
            }],
            'dealTips'       : '实际到账实际以银行最终处理实际为准',
            'phoneNum'      : '158 **** 3152',
            'hintCtrl|1': [0, 0, 1],
            'hintDesc': '若提前支取，之前派发的利息会从本金中扣除'
        }
    },
    // 活期+赎回初始化
    'sf/savings/redemption/init': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName|1'    : ['富民银行','长江银行','蓝海银行'],
            'productName'      : '富民宝',
            'elecAccountNum'    : '5608',
            'tradeAmount': '100000.00',
            'daysOfInterest': 65,
            'minInvestAmount': '50.00',
            'partRedemption': true,
            'rate': '4.30%',
            'productDetail'    : [{
                'name'         : '持有金额(元)',
                'value'        : '10,000.00'
            },{
                'name'         : '今日支取利率',
                'value'        : '4.70%'
            },{
                'name'         : '利息金额(元)',
                'value'        : '120.45'
            },{
                'name'         : '到账金额(元)',
                'value'        : '10,120.45'
            }],
            'protocol'         : [{
                'name'         : '平台产品购买服务协议',
                'url'          : 'https://www.jd.com?t=111'
            }, {
                'name'         : '南京银行产品购买服务协议',
                'url'          : 'https://www.nihaobank.com/newdirectbank/BillsAgreement.do?_locale=zh_CN&ProductId=2018020652679886'
            }],
            'dealTips'       : '实际到账实际以银行最终处理实际为准',
            'phoneNum'      : '158 **** 3152'
        }
    },
    'sf/savings/redemption/create': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
            "orderNum": "20180830CMBC00000007",
            "orderType": null,
            "telephone": "135****0402",
            "businessType": "ROLL_TYPE_INCOME"
        }
    },
    'sf/savings/verify/sendVerifyCode': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
          "smsVerifyId": "2018083000000024"
        }
    },

    // 存款类产品取出(API)
    'fp/api/bank/sureTakeOut': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'resultDesc'      : '取出成功',
            'resultDetail'    : '资金预计5分钟至24小时内转入电子账户'
        }
    },
    //历史收益
    'fp/api/deposit/product/historyRate':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            "list": [{
                'day'  : '2008-01-19',
                'rate' : '13.24%'
            }, {
                'day'  : '2013-10-23',
                'rate' : '6.43%'
            }]
        }
    },
    //结构化存款历史兑换收益
    'fp/api/structured/deposit/product/history/rate':{
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            "list": [{
                "rate" : "0.10%",
                "productId" : "whlh2018002"
            }, {
                "rate" : "0.10%",
                "productId" : "whlh2018008"
            }, {
                "rate" : "0.50%",
                "productId" : "whlh2018008"
            }]
        }
    },
    //赎回结果
    'fp/api/deposit/redemption/do': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            "resultDetail": "资金预计5分钟至24小时内转入电子账户",
            "resultDesc": "取出成功",
            "banner": {
                "id": 128,
                "pool": [{
                        "validityTimeBegin": 1517760000000,
                        "id": 195,
                        "sort": 1,
                        "linkUrl": "http://www.jd.com",
                        "imageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "cityName": "全国",
                        "validityTimeEnd": 1549296000000,
                        "h5ImageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "httpsImageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "adName": "开户完成1",
                        "city": 0
                    },{
                        "validityTimeBegin": 1517760000000,
                        "id": 195,
                        "sort": 1,
                        "linkUrl": "http://www.jd.com",
                        "imageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "cityName": "全国",
                        "validityTimeEnd": 1549296000000,
                        "h5ImageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "httpsImageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "adName": "开户完成1",
                        "city": 0
                }],
                "adpic": [

                ],
                "timing": 3,
                "playingOrder": 1,
                "city": 0
            }
        }
    },
    //活期+赎回结果
    'sf/savings/redemption/apply': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            "resultDetail": "资金预计5分钟至24小时内转入电子账户",
            "resultDesc": "取出成功",
            "banner": {
                "id": 128,
                "pool": [{
                        "validityTimeBegin": 1517760000000,
                        "id": 195,
                        "sort": 1,
                        "linkUrl": "http://www.jd.com",
                        "imageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "cityName": "全国",
                        "validityTimeEnd": 1549296000000,
                        "h5ImageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "httpsImageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "adName": "开户完成1",
                        "city": 0
                    },{
                        "validityTimeBegin": 1517760000000,
                        "id": 195,
                        "sort": 1,
                        "linkUrl": "http://www.jd.com",
                        "imageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "cityName": "全国",
                        "validityTimeEnd": 1549296000000,
                        "h5ImageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "httpsImageUrl": "https://img30.360buyimg.com/kj/jfs/t14935/207/2210757114/45525/132aa471/5a7ad5f5N57c3fb4a.jpg",
                        "adName": "开户完成1",
                        "city": 0
                }],
                "adpic": [

                ],
                "timing": 3,
                "playingOrder": 1,
                "city": 0
            }
        }
    },
    //存款购买结果
    'fp/api/deposit/submitOrder': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'list': [{
                'desc' :  '成功购买5000.00元',
                'tips' :  '银行处理可能有延迟，请关注资产变化'
            }, {
                'desc' :  '2016-10-27开始产生收益'
            }, {
                'desc' :  '2017-10-27 结息',
                'tips' :  '到账时间一般在结息日后1-3个工作日，实际到账时间以银行最终处理时间为准'
            }],
            'banner': {
                'pool|0-3': [{
                    'linkUrl': 'https://qianbao.jd.com/p/page/RNdK4366a0ca.htm',
                    'h5ImageUrl': '@image("750x170", "#894FC4", "#FFF")',
                },{
                  'linkUrl': 'https://qianbao.jd.com/p/page/RNdK4366a0ca.htm',
                  'h5ImageUrl': '@image("750x170", "#894FC4", "#FFF")',
                }]
            }
        }
    },
    //富民资产详情页
    '/fp/api/deposit/holdDetail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'productRateDesc': '年化利率',
            'judicialTips|1': ['', '', '司法提示'],
            'title': '计息中，可提前取出',
            'productId|+1': 1,
            'productType': 1,
            'channelId|1': ['bsb', 'tfb'],
            'channelName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
            'productName|1': ['财富走向 100天', '安心计划1年'],
            'interestRate|1': ['6.18%', '4.52%'],
            'duration|1': ['120天', '1年'],
            'investAmount|10000-99999.1-2': 1,
            'latestIncome|100-5000.1-2': 1,
            'hasInterestTips|1': [0, 1],
            'status|1': ['0', '1', '2', '3'],
            'orderMeta': [{
                'name': '计息日期',
                'value': '2018-01-10',
                'color': 'yellow'
            }],
            'receivedProfit|1': ['66.00','']
        }
    },
    // 活期+资产详情
    'sf/savings/position/detail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'title': '计息中，可提前取出',
            'productId|+1': 1,
            'productType': 1,
            'savingsProductId': '@id()',
            'savingsChannelId|1': ['bsb', 'tfb'],
            'channelId|1': ['bsb', 'tfb'],
            'channelName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
            'productName|1': ['财富走向 100天', '安心计划1年'],
            'interestRate|1': ['6.18%', '4.52%'],
            'duration|1': ['120天', '1年'],
            'investAmount|10000-99999.1-2': 1,
            'latestIncome|100-5000.1-2': 1,
            'hasInterestTips|1': [0, 1],
            'status|1': ['0', '1', '2', '3'],
            'orderMeta': [{
                'name': '计息日期',
                'value': '2018-01-10',
                'color': 'yellow'
            }],
            'receivedProfit|1': ['66.00','']
        }
    },
    // 结构化存款资产详情页
    '/fp/api/structured/deposit/holdDetail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'title': '计息中，可随时取出',
            'channelName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
            'productName|1': ['财富走向 100天', '安心计划1年'],
            'productStatus|1': [0, 1, 2, 3, 4],
            'productRate': {
                'name': '参考年化收益率',
                'value': '1.65%或5.23%'
            },
            'duration': {
                'name': '理财期限',
                'value': '5年'
            },
            'investAmount': {
                'name': '持有金额(元)',
                'value': '10,000.00'
            },
            'minExpireProfit': {
                'name': '到期保本收益(元)',
                'value': '+5.44',
                'color': 'yellow'
            },
            'maxExpireProfit': {
                'name': '到期最高收益(元)',
                'value': '+5.44',
                'color': 'yellow'
            },
            'orderId': '3213131',
            'orderStatus|1': [0, 1],
            'orderMeta': [{
                'name': '计息日期',
                'value': '2018-01-10',
                'color': 'yellow'
            }, {
                'name': '持有金额(元)',
                'value': '10,000.00'
            }, {
                'name': '今日支取利率',
                'value': '4.70%'
            }, {
                'name': '利息金额(元)',
                'value': '120.45'
            }, {
                'name': '到账金额(元)',
                'value': '10,120.45'
            }],
            'payback': {
                'handle': '可提前支取',
                'content': '产品到期后，本金和收益将于0-3个工作日(如遇节假日则顺延)内自动兑付到购买时的银行卡，如小金库购买则兑付至小金库。'
            },
            'remarks': '备注：挂钩黄金价格水平为伦敦金银市场协会发布的下午定盘价，该价格在彭博社参照页面"GOLDLNPM CMDTY"每日公布。'
        }
    },

    //赎回
    'fp/api/insuranceRedeem/submit': {
        'resultCode': 0,
        'resultMsg': '',
        "resultData":{
            'resultDesc'      : '取出成功',
            'resultDetail'    : '资金预计5分钟至24小时内转入电子账户'
        }
    },

    //风评
    'fp/api/risk/queryRiskQuestion': {
        "resultCode": 0,
        "businessCode": "SUCCESS",
        "resultMsg": "操作成功",
        "resultData":{
            "channelName": "民生银行",
            "questionsList|3-10": [{
                "id": "2082999792612668236",
                "question": "1.您的年龄是？",
                "answersList": [{
                    "answerContent": "A. 18-30 岁",
                    "selection": "A"
                },{
                    "answerContent": "B. 31-50 岁",
                    "selection": "B"
                },{
                    "answerContent": "C. 51-65 岁",
                    "selection": "C"
                },{
                    "answerContent": "D. 高于65 岁",
                    "selection": "D"
                },{
                    "answerContent": "E. 18周岁以下",
                    "selection": "E"
                }]
            }]
        }
    },
    //风评结果
    'fp/api/risk/commitRiskAnswer': {
        'resultCode': 0,
        'resultMsg': '',
        "resultData":{
            'riskLevelName'    : '稳健型',
            'assessDesc'       : '您已完成风险测评，快去购买您心仪的理财产品吧',
            'riskCheckResult'  : '资金预计5分钟至24小时内转入电子账户',
            'riskCheckResult|1': ['0','1']
        }
    },
    //保险类产品购买结果
    'fp/api/insurancePayment/submit': {
        'resultCode': 0,
        'businessCode|1': ['ACC_0001','PRO_0004','PRO_0001',''],
        'resultMsg': '购买失败购买失败购买失败购买失败购买失败购买失败',
        'resultData': {
            'list': [{
                'desc' :  '成功购买5000.00元',
                'tips' :  '银行处理可能有延迟，请关注资产变化'
            }, {
                'desc' :  '2016-10-27开始产生收益'
            }, {
                'desc' :  '2017-10-27 结息',
                'tips' :  '到账时间一般在结息日后1-3个工作日，实际到账时间以银行最终处理时间为准'
            }],
            'banner': {
                'pool|0-3': [{
                    'linkUrl': 'https://qianbao.jd.com/p/page/RNdK4366a0ca.htm',
                    'h5ImageUrl': '@image("750x170", "#894FC4", "#FFF")',
                }]
            }
        }
    },

    // 产品详情优化(定期) type = 0
    'fp/fixed/product/detail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
            'productName|1': ['财富走向 100天', '安心计划1年'],
            'productRate': {
                'name':'预期年化收益率(%)',
                'value|4-8.2': 1
            },
            'duration': {
                'name':'产品期限(天)',
                'value|180-365': 180
            },
            'productTags': ['随存随取', '本息保障'],
            'productDesc': [{
                'name': '产品提供',
                'value|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行']
            }, {
                'name': '购买截止',
                'value': '2017年05月18日 15:00'
            }, {
                'name': '项目融资',
                'value': '600,000.00元'
            },{
                'name': '产品剩余',
                'value': '200,000.00元'
            },{
                'name': '赎回方式',
                'value': '到期自动赎回'
            }],
            'productRule': [{
                'name': '收益规则',
                'value': '本产品当日购买，当日计息；<br />可随时支取，按照支取当日的“今日支取利率”计算实际持有天数的收益。',
                'more': '查看详细收益规则'
            }, {
                'name': '到期处理',
                'value': '到期后本金和收益自动买入下一期，收益不间断；<br />同一交易日购买的订单到期处理方式需保持一致，后续可在资产持仓页进行修改。'
            }],
            'question|4': [{
                'name': '是否支持提前取出?',
                'value': '不可以'
            }],
            'bankPhone':['95555','400-800-433'],
            'status|1': ['0','1','2','3','4'],

            'investAmount': {
                'name': '起投金额(元)',
                'value': '1,0000.00'
            },
            'increaseAmount': {
                'name': '递增金额(元)',
                'value': '100.00'
            },
            'timeLine': [{
                'name': '开始计息',
                'value': '2017-02-28'
            },{
                'name': '到期日期',
                'value': '2018-02-27'
            },{
                'name': '本息到账',
                'value': '3个工作日内'
            }],
            'productIntro': '项目详情',
            'beginTime': function() {
                var curDate = new Date();
                var nowDate = new Date((curDate/1000+86400*2+20000)*1000).getTime();
                return nowDate;
            },
            'currentTime': function() {
                var nowDate = new Date().getTime();
                return nowDate;
            },
            productMoreUrl: '//m.jd.com',
            channelIntroduceUrl: '//m.jd.com',
            'closeNotes|1': ['产品正在积极准备中。定好闹钟，20：30继续开抢！', '']
        }
    },

    // 产品详情优化(存款) type = 1
    'fp/deposit/product/detail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
            'productName|1': ['财富走向 100天', '安心计划1年'],
            'productRate': {
                'name':'储蓄存款利率(%)',
                'value|4-8.2': 1
            },
            'duration': {
                'name':'产品期限(天)',
                'value|180-365': 180
            },
            'productTags': ['随存随取', '本息保障'],
            'productDesc': [{
                'name': '产品提供',
                'value|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行']
            }, {
                'name': '购买截止',
                'value': '2017年05月18日 15:00'
            }, {
                'name': '项目融资',
                'value': '600,000.00元'
            },{
                'name': '产品剩余',
                'value': '200,000.00元'
            },{
                'name': '赎回方式',
                'value': '到期自动赎回'
            }],
            'productRule': [{
                'name': '计息规则',
                'value': '本产品当日购买，当日计息；<br />可随时支取，按照支取当日的“今日支取利率”计算实际持有天数的收益。',
                'data': [{
                    'name': '持有时间',
                    'value': '储蓄存款利率'
                }, {
                    'name': '持有时间<3个月',
                    'value': '0.385%'
                }, {
                    'name': '3个月≤持有时间<6个月',
                    'value': '1.595%'
                }, {
                    'name': '6个月≤持有时间<1年',
                    'value': '1.885%'
                }, {
                    'name': '持有时间=1年',
                    'value': '2.175%'
                }],
                'example': '<div class="example-desc">假设小明在2018年4月18日存入10000元，<br>2018年11月18日取出全部本金，<br>已存入210天。</div><div class="example-rule"><div class="head">根据靠档计息原则，支取利率为 <span class="blue">1.885%</span></div><div class="body">利息=10000*1.885%*210/360 = <span class="blue">109.95元</span><br>支取本息=10000+109.95 = <span class="blue">10109.95元</span></div></div>'
            }],
            'question|0-4': [{
                'name': '是否支持提前取出?',
                'value': '不可以'
            }],
            'bankPhone':['95555','400-800-433'],
            'status|1': ['0','1','2','3','4']
        }
    },


    // 产品详情优化(货基) type = 2
    'fp/roll/product/detail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
            'productName|1': ['财富走向 100天', '安心计划1年'],
            'productRate': {
                'name':'七日年化收益率(%)',
                'value|4-8.2': 1
            },
            'duration': {
                'name':'产品期限(天)',
                'value|180-365': 180
            },
            'productTags': ['随存随取', '本息保障'],
            'productDesc': [{
                'name': '产品提供',
                'value|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行']
            }, {
                'name': '购买截止',
                'value': '2017年05月18日 15:00'
            }, {
                'name': '项目融资',
                'value': '600,000.00元'
            },{
                'name': '产品剩余',
                'value': '200,000.00元'
            },{
                'name': '赎回方式',
                'value': '到期自动赎回'
            }],
            'productRule': [{
                'name': '收益规则',
                'value': '本产品当日购买，当日计息；<br />可随时支取，按照支取当日的“今日支取利率”计算实际持有天数的收益。',
                'moreUrl': 'http://www.baidu.com'
            }, {
                'name': '到期处理',
                'value': '到期后本金和收益自动买入下一期，收益不间断；<br />同一交易日购买的订单到期处理方式需保持一致，后续可在资产持仓页进行修改。'
            }],
            'question|0-4': [{
                'name': '是否支持提前取出?',
                'value': '不可以'
            }],
            'bankPhone':['95555','400-800-433'],
            'status|1': ['0','1','2','3','4'],

            'investAmount': {
                'name': '起投金额(元)',
                'value': '1,0000.00'
            },
            'timeLine': [{
                'name': '开始计息',
                'value': '2017-02-28'
            },{
                'name': '到期日期',
                'value': '2018-02-27'
            },{
                'name': '本息到账',
                'value': '3个工作日内'
            }],
            'tenThousandProfit' : {
                'name':'万份收益(元)',
                'value|1-2.2': 1
            },
            'marketTrend': [{
                'name': '近七日年化收益',
                'unit': '%',
                'data|30': [{
                    'yAxis|4-5.4': 5.1234,
                    'xAxis': '@date(yyyy.MM.dd)'
                }],
                'tips': '近一个月七日年化收益走势'
            }, {
                'name': '每万份收益(元)',
                'unit': '元',
                'data|30': [{
                    'yAxis|4-5.4': 5.1234,
                    'xAxis': '@date(yyyy.MM.dd)'
                }],
                'tips': '近一个月每万份收益走势'
            }]
        }
    },


    // 产品详情优化(保险) type = 3
    'fp/insurance/product/detail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
            'productName|1': ['财富走向 100天', '安心计划1年'],
            'productRate': {
                'name':'历史年化投资回报率(%)',
                'value|4-8.2': 1
            },
            'duration': {
                'name':'产品期限(天)',
                'value|180-365': 180
            },
            'productTags': ['随存随取', '本息保障'],
            'productDesc': [{
                'name': '产品提供',
                'value|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行']
            }, {
                'name': '购买截止',
                'value': '2017年05月18日 15:00'
            }, {
                'name': '项目融资',
                'value': '600,000.00元'
            },{
                'name': '产品剩余',
                'value': '200,000.00元'
            },{
                'name': '赎回方式',
                'value': '到期自动赎回'
            }],
            'productRule': [{
                'name': '收益规则',
                'value': '本产品当日购买，当日计息；<br />可随时支取，按照支取当日的“今日支取利率”计算实际持有天数的收益。',
            }, {
                'name': '到期处理',
                'value': '到期后本金和收益自动买入下一期，收益不间断；<br />同一交易日购买的订单到期处理方式需保持一致，后续可在资产持仓页进行修改。'
            }],
            'question|0-4': [{
                'name': '是否支持提前取出?',
                'value': '不可以'
            }],
            'bankPhone':['95555','400-800-433'],
            'status|1': ['0','1','2','3','4'],

            'investAmount': {
                'name': '起投金额(元)',
                'value': '1,0000.00'
            },
            'timeLine': [{
                'name': '开始计息',
                'value': '2017-02-28'
            },{
                'name': '到期日期',
                'value': '2018-02-27'
            },{
                'name': '本息到账',
                'value': '3个工作日内'
            }],
            'increaseAmount' : {
                'name':'递增金额(元)',
                'value': '100.00'
            },
            'photoDetail': {
                'name': '图文详情',
                'value': 'https://bankplus.jd.com/m-life/plaFinancingtran/static/img/temp/jnrc_insurance.png'
            },
            'needPreCheck|1-2': false
        }
    },


    // 产品详情优化(活期宝类) type = 4
    'fp/savingsdeposit/product/detail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
            'productName|1': ['财富走向 100天', '安心计划1年'],
            'productRate': {
                'name':'提前支取利率(%)',
                'value|4-8.2': 1
            },
            'duration': {
                'name':'产品期限(天)',
                'value': '随存随取'
            },
            'productTags': ['随存随取', '本息保障'],
            'saleDesc': {
                'text': "富民宝每日分渠道限时限量发售，若该渠道售罄，可前往【京东银家】小程序端查看购买。点击查看详情",
                'transferPortal': "WXXC"
            },
            'productDesc': [{
                'name': '产品提供',
                'value|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行']
            }, {
                'name': '购买截止',
                'value': '2017年05月18日 15:00'
            }, {
                'name': '项目融资',
                'value': '600,000.00元'
            },{
                'name': '产品剩余',
                'value': '200,000.00元'
            },{
                'name': '赎回方式',
                'value': '到期自动赎回'
            }],
            'productRule': [{
                'name': '收益规则',
                'value': '本产品当日购买，当日计息；<br />可随时支取，按照支取当日的“今日支取利率”计算实际持有天数的收益。',
            }, {
                'name': '到期处理',
                'value': '到期后本金和收益自动买入下一期，收益不间断；<br />同一交易日购买的订单到期处理方式需保持一致，后续可在资产持仓页进行修改。'
            }],
            'question|0-4': [{
                'name': '是否支持提前取出?',
                'value': '不可以'
            }],
            'bankPhone':['95555','400-800-433'],
            'status|1': ['0','1','2','3','4'],

            'investAmount': {
                'name': '起投金额(元)',
                'value': '1,0000.00'
            },
            'increaseAmount': {
                'name':'递增金额(元)',
                'value': '100.00'
            },
            'tenThousandProfit': {
                'name':'万份收益(元)',
                'value|1-2.2': 1
            }
        }
    },

    // 提现页面初始化
    'bankinterest/interest/account': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            "account":1.64,
            "accountStr":"1.64",
            "total":0,
            "threshold":null,
            "withdrawAmount":1.62,
            "withdrawAmountStr": '1.62',
            "couponNumber":1,
            "overdueNumber":0,
            "awardNumber":1
        }
    },

    // 银行+权益 已完成任务列表
    'bankinterest/task/donelist': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'count': 10,
            'okNumber': 10,
            'channelId': '',
            'productType': '',
            'productId': '',
            'page': 1,
            'totalPage': 5,
            'list|0-10': [
                {
                    'actId|+1': 1,
                    'actName': '@cword(1,4)',
                    'tags|+1': 1,
                    'rewardAssetName': '@cword(1,4)',
                    'userTaskStatus|1': [-1, 0, 1, 2, 3],
                    'userInterestStatus|1': [0, 1, 2],
                    'partTime': '@now(T)',
                    'progressingValue': '',
                    'progressedValue': ''
                }
            ]
        }
    },

    // 银行+权益 其他奖励列表
    'bankinterest/task/awardlist': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'count': 10,
            'okNumber': 10,
            'channelId': '',
            'productType': '',
            'productId': '',
            'page': 1,
            'totalPage': 5,
            'list|10-20': [
                {
                    'rewardType|1': ['COUPONS','FLOW','COUPON_PKG','INCREASE_INTEREST_REDPKG','COMMON_REDPKG','INTEREST_CASH_REDPKG'],
                    'rewardAssetName': '@cword(1,4)',
                    'actName': '@cword(1,4)',
                    'partTime': '@now(T)',
                    'tags': ''
                }
            ]
        }
    },

    // 银行+权益 银行卡列表
    '/bankinterest/withdraw/cardlist': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData|0-10': [
                {
                    'cardId|+1': 1,
                    'bankNo': 12345,
                    'cardNoStart': 123456,
                    'cardNoEnd': 1234,
                    'bankName': '@cword(1,10)',
                    'bankLogo': 'aaa'
                }
        ]
        
    },

    // 银行+用户购买某银行产品该行权益券列表
    'bankinterest/voucher/list': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'couponId': '2',
            'couponStatus': '0',
            'couponStatusDesc': '不可用描述',
            
            
            'count': 10,
            'okNumber': 10,
            'channelId': '',
            'productType': '',
            'productId': '',
            'page': 1,
            'totalPage': 5,
            'list': [
                {
                    'id': 1,
                    'couponName': '加息券1',
                    'couponCode': 1,
                    'typeCode': 'rates',
                    'typeName': '',
                    'topAmount': 10000,
                    'topAmountStr': '10000',
                    'lowAmout': 200,
                    'lowAmoutStr': '200',
                    'counponDay': 5,
                    'expectIncome': 2000,
                    'expectIncomeStr': '2000',
                    'incomeTop': 200,
                    'incomeTopStr': '200',
                    'denomination': 200,
                    'denominationStr': '200',
                    'increaseRate': 0.1,
                    'increaseRateStr': '0.1',
                    'validDate': '@now(T)',
                    'status': 1,
                    'limitBank': '',
                    'limitSource': '',
                    'unValidDesc': '不能用',
                    'isFirst': 1
                },
                {
                    'id': 2,
                    'couponName': '加息券2',
                    'couponCode': 1,
                    'typeCode': 'rates',
                    'typeName': '',
                    'topAmount': 10000,
                    'topAmountStr': '10000',
                    'lowAmout': 200,
                    'lowAmoutStr': '200',
                    'counponDay': 5,
                    'expectIncome': 2000,
                    'expectIncomeStr': '2000',
                    'incomeTop': 200,
                    'incomeTopStr': '200',
                    'denomination': 200,
                    'denominationStr': '200',
                    'increaseRate': 0.1,
                    'increaseRateStr': '0.1',
                    'validDate': '@now(T)',
                    'status': 1,
                    'limitBank': '',
                    'limitSource': '',
                    'unValidDesc': '不能用',
                    'isFirst': 1
                },
                {
                    'id': 3,
                    'couponName': '加息券3',
                    'couponCode': 1,
                    'typeCode': 'rates',
                    'typeName': '',
                    'topAmount': 10000,
                    'topAmountStr': '10000',
                    'lowAmout': 200,
                    'lowAmoutStr': '200',
                    'counponDay': 5,
                    'expectIncome': 2000,
                    'expectIncomeStr': '2000',
                    'incomeTop': 200,
                    'incomeTopStr': '200',
                    'denomination': 200,
                    'denominationStr': '200',
                    'increaseRate': 0.1,
                    'increaseRateStr': '0.1',
                    'validDate': '@now(T)',
                    'status': 1,
                    'limitBank': '',
                    'limitSource': '',
                    'unValidDesc': '不能用',
                    'isFirst': 1
                }
            ]
        }
    },

    // 券详情按钮状态
    'bankinterest/interest/detail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'receivedStatus|1': ['0', '1', '2']
        }
    },

    // 券领取接口
    'bankinterest/coupon/receive': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
        
        }
    },

    // 我的权益券列表
    'bankinterest/voucher/holdlist': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'count': 10,
            'page': 1,
            'totalPage': 5,
            'totalIncome': 9999,
            'list|0-10': [
                {
                    'id|+1': 1,
                    'couponName': '@cword(1,4)',
                    'couponCode|+1': 1,
                    'typeCode|1': ['redpkg', 'rates'],
                    'typeName': '@cword(1,4)',
                    'topAmount': 10000,
                    'topAmountStr': '10000',
                    'lowAmout|100-20000': 200,
                    'lowAmoutStr': '200',
                    'counponDay|1-100': 5,
                    'expectIncome': 2000,
                    'expectIncomeStr': '2000',
                    'incomeTop|100-20000': 200,
                    'incomeTopStr': '200',
                    'denomination|100-20000': 200,
                    'denominationStr': '200',
                    'increaseRate': 0.1,
                    'increaseRateStr': '0.1',
                    'validDate': '@now(T)',
                    'status|1': [0, 1, 2],
                    'limitBank': '',
                    'limitSource': '',
                    'isFirst|1': [0, 1],
                    'channelId': 'a,b,c',
                    'businessType': '1,2,3',
                    'couponShowName': '@cword(1,4)'
                }
            ]
        }
    },

    // 我的权益券详情
    'bankinterest/voucher/detail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'id|+1': 1,
            'couponName': '@cword(1,4)',
            'couponCode|+1': 1,
            'typeCode|1': ['redpkg', 'rates'],
            'typeName': '@cword(1,4)',
            'topAmount': 10000,
            'topAmountStr': '10000',
            'lowAmout|100-20000': 200,
            'lowAmoutStr': '200',
            'counponDay|1-100': 5,
            'expectIncome': 2000,
            'expectIncomeStr': '2000',
            'validDate': '@now(T)',
            'status|1': [0, 1, 2],
            'limitBank': '',
            'limitSource|1': ['jdjr', 'jdsc', 'wx', 'all'],
            'denomination|100-20000': 200,
            'denominationStr': '200',
            'increaseRate': 0.1,
            'increaseRateStr': '0.1',
            'incomeTop|100-200000': 500,
            'incomeTopStr': '500',
            'limitAssets': '存款',
            'channelId': 'a,b,c',
            'businessType': '1,2,3',
            'couponDesc': 'afadfasfasdfsadfsadfsadfasfasfasfasfsafasasfasfasfasasdfsadfsafsafasdfafasasfafasfaasfasdfasfasfsafsafasfasfasfa',
            'status|1': ['0', '1', '2', '3', '4', '5']
        }
    },

    // 权益明细
    'bankinterest/income/list': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'count': 10,
            'page': 1,
            'totalPage|1-5': 5,
            'list|0-10': [
                {
                    'id|+1': 1,
                    'couponName': '@cword(1,4)',
                    'couponCode|+1': 1,
                    'typeCode|1': ['redpkg', 'rates'],
                    'typeName': '@cword(1,4)',
                    'income': 5,
                    'incomeStr': '5',
                    'status': '',
                    'useTime': '@now(T)'
                }
            ]
        }
    },

    // 提现明细
    '/bankinterest/withdraw/list': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'count': 10,
            'page': 1,
            'totalPage|1-5': 5,
            'list|0-10': [
                {
                    'id|+1': 1,
                    'createdDate': '@now(T)',
                    'amount': 5,
                    'amountStr': '5',
                    'bankName': '中国银行',
                    'withdrawType|1': [1, 2],
                    'cardNoStart': '123456',
                    'cardNoEnd': '1234',
                    'oprStatus|1': [0, 1, 2]
                }
            ]
        }
    },

    // 获取分享url
    'bankinterest/share/getShareUrl': {
        "resultCode": 0,
        "resultMsg": {
            "code": "0000",
            "msg": "操作成功"
        },
        "resultData": {
            "urlToOther": null,
            "urlToWX": "http://dev.jdpay.com/mact/html/bpshare/?code=SHARE_A227D1432E91CE38",
            "header": "京东金融银行+test",
            "content": "我觉得富民银行富民宝_京东很不错，推荐给你哦test",
            "logo": "https://img14.360buyimg.com/wympay/jfs/t3133/213/4362144497/9841/16c8e275/583fe82dN2968a3d6.png"
        },
        "resultControl": null
    },



    // 产品详情优化(结构化存款) type = 5
    'fp/api/structured/deposit/product/detail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
            'productName|1': ['财富走向 100天', '安心计划1年'],
            'productRate': {
                'name':'参考年化收益率(%)',
                'value': '4.8<span>或</span>5.8'
            },
            'duration': {
                'name':'产品期限(天)',
                'value|180-365': 180
            },
            'productDesc': [{
                'name': '产品提供',
                'value|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行']
            }, {
                'name': '购买截止',
                'value': '2017年05月18日 15:00'
            }, {
                'name': '项目融资',
                'value': '600,000.00元'
            },{
                'name': '产品剩余',
                'value': '200,000.00元'
            },{
                'name': '赎回方式',
                'value': '到期自动赎回'
            }],
            'productRule': [{
                'name': '风险提示',
                'value': '本产品为结构性存款，本产品风险等级为低风险等级，承诺保本保最低收益，不承诺保超额收益，产品的投资风险由投资人承担。'
            }],
            'question|4': [{
                'name': '是否支持提前取出?',
                'value': '不可以'
            }],
            'bankPhone':['95555','400-800-433'],
            'status|1': ['0','1','2','3','4'],

            'productTags': ['随存随取', '本息保障'],
            'profitDesc': {
                'data': [{
                    name: '$300',
                    rate: '1.65%'
                }, {
                    name: '$2200',
                    rate: '5.35%'
                }, {
                    name: '美元/盎司',
                    rate: '1.65%'
                }],
                'tips': '挂钩伦敦金价格,到期观察日伦敦金下午定盘价在每盎司300美金至2200美金区间内则年化收益5.35%，否则获得保本年化收益1.65%。<br/>注：',
                'example': 'http://dev.jdpay.com/product/static/bob/1',
                'history': '查看历史兑付收益率'
            },
            'timeLine': [{
                'name': '开始计息',
                'value': '2017-02-28'
            },{
                'name': '到期日期',
                'value': '2018-02-27'
            },{
                name: '本息到账',
                'value': '3个工作日内'
            }],
            'closeNotes|1': ['产品正在积极准备中。定好闹钟，20：30继续开抢！', ''],
            'channelIntroduceUrl': '//m.jd.com',
            'productMoreUrl': '//m.jd.com'
        }
    },
  
    // 产品详情优化(结构化存款) type = 6
    'fp/norm/fixedrdm/prd/detail': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'channelName|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行'],
            'productName|1': ['财富走向 100天', '安心计划1年'],
            'productRate': {
                'name':'参考年化收益率(%)',
                'value': '4.8'
            },
            'duration': {
              'name':'产品期限(天)',
              'value|180-365': 180
            },
            'productDesc': [{
                'name': '产品名称',
                'value': '众邦宝30天'
            }, {
                'name': '产品推介方',
                'value|1': ['招商银行','建设银行','工商银行','交通银行','中国银行', '包商银行', '天府银行', '浦发银行']
            },{
                'name': '赎回方式',
                'value': '到期自动赎回，支持提前赎回'
            },{
                'name': '提前赎回利率',
                'value': '4.1%'
            }],
            'productRule': [{
                'name': '收益规则',
                'value': '本产品当日1：00到23：00点购买，当日起息，持有期满按照4.8%计算收益（其中基础利率4.1%，期满奖励利率0.7%）'
            },{
                'name': '到期处理',
                'value': '本产品到期后自动转出，资金实时到账至您的电子账户。'
            }],
            'question|4': [{
                'name': '是否支持提前取出?',
                'value': '不可以'
            }],
            'bankPhone':['95555','400-800-433'],
            'status|1': ['0','1','2','3','4'],
          
            'productTags': ['随存随取', '本息保障'],
            'timeLine': [{
                'name': '开始计息',
                'value': '2017-02-28'
            },{
                'name': '到期日期',
                'value': '2018-02-27'
            },{
                'name': '本息到账',
                'value': '3个工作日内'
            }],
            'channelIntroduceUrl': '//m.jd.com',
            'saleDesc': {
                'text': "富民宝每日分渠道限时限量发售，若该渠道售罄，可前往【京东银家】小程序端查看购买。点击查看详情",
                'transferPortal': "WXXC"
            }
        }
    },
    
    // 近3月每日收益
    'fp/api/interest/daily': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            hasMore: function() {
                if (this.list.length > 0) {
                    return true;
                }
                return false;
            },
            'list|0-5': [{
                "amount|4.2": 4.1,
                "date": "@date(yyyy-MM-dd)"
            }]
        }
    },
    
    'fp/api/bank/accountUnLock': {
        'resultCode': -1,
        'resultMsg': '解锁失败，请稍后再试或联系客服',
        'resultData': {}
    },

    // 近3月每日收益
    'fp/api/interest/daily': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            hasMore: function() {
                if (this.list.length > 0) {
                    return true;
                }
                return false;
            },
            'list|0-5': [{
              "amount|4.2": 4.1,
              "date": "@date(yyyy-MM-dd)"
            }]
        }
    },

    // 稠州银行产品说明书
    'api/structured/deposit/product/description': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'minRate': '2.25%',
            'maxRate': '5.40%',
            'amountBegin': '1000.00元',
            'amountStep': '100.00元',
            'productTime': '2018年06月15日-2018年06月17日',
            'interestBeginTime': '2018年6月18日',
            'interestEndTime': '2019年06月18日',
            'priceIntervalMax': '220',
            'priceIntervalMin': '160',
            'termForMonth': '12',
            'expirationDate': '2019年06月14日',
            'samplePriceMax': '150.00',
            'samplePriceMin': '100.00',
            'samplePrincipal': '30,000,000.00',
            'sampleInterestDays': '365'
        }
    },

    // 检查用户是否已开户
    'oasis/open/check': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'status|1': [2,3,3,3,3,3,3]
        }
    },

    'fp/api/productbuy/preCheck': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
        
        }
    },

    'oc/roll/purchase/init': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
            "channelName": "民生银行",
            "productName": "安邦安增益2号",
            "interestRate": {
                "name": "七日年化利率",
                "value": "0.0634000"
            },
            "productRate": {
                "name": "万份收益",
                "value": "0.90880"
            },
            "productBalance": "5000000.00",
            "investMinAmount": "1000.00",
            "increaseAmount": "1.00",
            "buyMaxAmount": null,
            "buyIncomeDesc": "15:00之前购买，预计01.14开始计息，01.15可查看收益",
            "elecAccBalance": "8010.68",
            "elecAccLabel": "民生银行电子账户(4337)",
            "expireHandleWay": {
                "icon": null,
                "text": "到期安排",
                "name": null,
                "desc": "同一交易日购买的订单到期处理方式需保持一致，后续可在资产持仓页进行修改",
                "options": [{
                    "name": "到期后自动赎回",
                    "value": "1",
                    "desc": "到期后本金和收益自动买入下一期",
                    "selected": true
                }]
            },
            "beforeHandle": {
                "code": "",
                "desc": "风险评测内容提示"
            },
            "riskLevel": null,
            "protocol": [
              {
                "name": "安邦安增益2号产品合同文本",
                "url": "https://bankplus.jd.com/m-life/plaFinancingtran/static/agreement/cmbc/3.pdf"
              },
              {
                "name": "安邦安增益2号产品投资组合说明书",
                "url": "https://bankplus.jd.com/m-life/plaFinancingtran/static/agreement/cmbc/4.pdf"
              },
              {
                "name": "安邦安增益2号募集公告",
                "url": "https://bankplus.jd.com/m-life/plaFinancingtran/static/agreement/cmbc/5.pdf"
              },
              {
                "name": "安邦安增益2号投资风险提示函",
                "url": "https://bankplus.jd.com/m-life/plaFinancingtran/static/agreement/cmbc/6.pdf"
              },
              {
                "name": "京东金融银行业开放平台服务协议",
                "url": "https://bankplus.jd.com/m-life/plaFinancingtran/protocol"
              }
            ]
        }
    },

    'oc/roll/purchase/createOrder': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
            "orderNum": "20180830CMBC00000007",
            "orderType": null,
            "telephone": "135****0402",
            "businessType": "ROLL_TYPE_INCOME"
        }
    },

    'oc/verify/sendVerifyCode': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
          "smsVerifyId": "2018083000000024"
        }
    },

    'oc/verify/submit': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
        }
    },

    // 当日系列产品详情
    'sf/savings/product/detail': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
            "channelName": "蓝海银行",
            "channelIntroduceUrl": "https://m.jr.jd.com/mjractivity/44689-2.html",
            "productName": "“当日”系列产品",
            "productRate": {
                "name": "提前支取利率(%)",
                "value": "5.08"
            },
            "duration": {
                "name": "产品期限",
                "value": "随时支取"
            },
            "tenThousandProfit": {
                "name": "万份收益(元)",
                "value": "1.3904"
            },
            "investAmount": {
                "name": "起投金额(元)",
                "value": "50.00"
            },
            "increaseAmount": {
                "name": "递增金额(元)",
                "value": "1.00"
            },
            "productDesc": [{
                    "name": "产品名称",
                    "value": "“当日”系列产品"
                },
                {
                    "name": "产品推介方",
                    "value": "蓝海银行"
                },
                {
                    "name": "产品类型",
                    "value": "创新型现金管理类产品"
                },
                {
                    "name": "赎回方式",
                    "value": "提前支取或者到期自动赎回到电子户"
                }
            ],
            "productRule": [{
                    "name": "计息规则",
                    "value": "23:00之前购买当日起息(含节假日),具体以银行订单处理时间为准;<br/>可随时支取,支取利率为基础利率4.8750%+学习理财知识奖励利率0.40%。"
                },
                {
                    "name": "支取规则",
                    "value": "任意时间支取，实时到账。"
                }
            ],
            "question": [{
                "name": "活期+问题1--test",
                "value": "活期+答案1--test"
            }],
            "status": "1",
            "bankPhone": [
                "44546-96368"
            ],
            "productTags": [
                "起投金额50元",
                "银行承兑"
            ],
            "childChannelId": "bob",
            "childProductId": "832TD03N001",
            "saleDesc": {
                "text": "每日限量发售，若售罄，请次日尽早购买"
            }
        }
    },

    // 当日系列购买初始化
    'sf/savings/order/init': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
            "channelName": "蓝海银行",
            "signBuyLimit": "",
            "productState": 1,
            "stateDesc": "",
            "productType": "4",
            "productName": "“当日”系列产品",
            "surplusAmount": 100000000,
            "surplusDesc": "当日起息，可随时支取",
            "expectedYieldRate": "5.08%",
            "paymentAmountDesc": "50元起投, 1元递增",
            "minInvestAmount": 50,
            "insuranceAmount": 1,
            "bankIcon": "https://bankplus.jd.com/m-life/plaFinancingtran/static/img/bank/bob.png",
            "phoneNumber": "133 **** 1115",
            "elecAccountNum": "4925",
            "availableBalance": 13540.69,
            "availableDes": "13,540.69",
            'protocol'         : [{
                'name'         : '平台产品购买服务协议',
                'url'          : 'http://dev.jdpay.com/protocol'
            }, {
                'name'         : '南京银行产品购买服务协议',
                'url'          : 'https://www.nihaobank.com/newdirectbank/BillsAgreement.do?_locale=zh_CN&ProductId=2018020652679886'
            }],
            "buyExplain": null
        }
    },

    // 当日系列购买计算收益
    'sf/savings/order/profit/expect': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
            "expectedReturn": "预计每日可得收益<span>1.41</span>元"
        }
    },

    // 当日系列购买创建订单
    'sf/savings/order/create': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
            "orderNum": "savings-bob1538118540061",
            "telephone": "13311111115"
        }
    },

    // 当日系列购买发送短信验证码
    'sf/savings/code/getVcode': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
            "smsVerifyId": "11111"
        }
    },

    // 当日系列购买发送短信验证码
    'sf/savings/verify/sendVerifyCode': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
            "smsVerifyId": "11111"
        }
    },

    // 当日系列购买提交
    'sf/savings/order/apply': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
            "list": [{
                    "desc": "成功购买 100.00 元",
                    "tips": ""
                },
                {
                    "desc": "2018-09-28 开始产生收益",
                    "tips": ""
                },
                {
                    "desc": "可随时支取，按提前支取利率计息",
                    "tips": "资金一般实时到账，实际到账时间以银行最终处理时间为准"
                }
            ],
            "banner": {
                "adpic": [],
                "city": 0,
                "timing": 3,
                "pool": [{
                    "validityTimeEnd": 1549296000000,
                    "adName": "发卡首页广告",
                    "cityName": "全国",
                    "validityTimeBegin": 1517760000000,
                    "city": 0,
                    "imageUrl": "http://img30.360buyimg.com/kj/jfs/t16939/88/1688737620/43661/a4558799/5ad43e79Nc778e88d.jpg",
                    "httpsImageUrl": "https://img30.360buyimg.com/kj/jfs/t16939/88/1688737620/43661/a4558799/5ad43e79Nc778e88d.jpg",
                    "linkUrl": "http://www.jd.com",
                    "id": 194,
                    "sort": 1,
                    "h5ImageUrl": "//img30.360buyimg.com/kj/jfs/t16939/88/1688737620/43661/a4558799/5ad43e79Nc778e88d.jpg"
                }],
                "playingOrder": 1,
                "id": 133
            }
        }
    },


    // 当日系列持仓
    'sf/savings/position/index': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
            "summary": {
                "totalInterestAmount": "17.39",
                "holdAmount": "41,438.00",
                "latestInterestAmount": "131.55"
            },
            "detailList": [{
                    "leftTitle": "持有金额",
                    "leftValue": "1,000.00",
                    "centerTitle": "今日支取收益",
                    "centerValue": "0.00",
                    "rightTitle": "持有银行",
                    "rightValue": "蓝海银行",
                    "productId": "832TD03N001",
                    "orderId": "savings-bob1538064403486",
                    "channelId": "bob"
                },
                {
                    "leftTitle": "持有金额",
                    "leftValue": "50.00",
                    "centerTitle": "今日支取收益",
                    "centerValue": "0.00",
                    "rightTitle": "持有银行",
                    "rightValue": "蓝海银行",
                    "productId": "832TD03N001",
                    "orderId": "savings-bob1538069953868",
                    "channelId": "bob"
                },
                {
                    "leftTitle": "持有金额",
                    "leftValue": "50.00",
                    "centerTitle": "今日支取收益",
                    "centerValue": "0.00",
                    "rightTitle": "持有银行",
                    "rightValue": "蓝海银行",
                    "productId": "832TD03N001",
                    "orderId": "savings-bob1538070266908",
                    "channelId": "bob"
                },
                {
                    "leftTitle": "持有金额",
                    "leftValue": "50.00",
                    "centerTitle": "今日支取收益",
                    "centerValue": "0.00",
                    "rightTitle": "持有银行",
                    "rightValue": "蓝海银行",
                    "productId": "832TD03N001",
                    "orderId": "savings-bob1538070328335",
                    "channelId": "bob"
                }
            ]
        }
    },
    // 当日系列产品列表
    '/sf/savings/product/productsList': {
        'resultCode': 0,
        'resultMsg': '',
        'resultData': {
            'page': {
                'hasMore': function() {
                    return false;
                },
                'list|3': [{
                    'channelName|1': ['招商银行','工商银行','建设银行'],
                    'productId|+1': 1,
                    'productType|1': [0, 1],
                    'productText|1': ['财富走向 100天', '安心计划1年'],
                    'tips|0-1': ['高收益', '综合年化6.15%'],
                    'interestRate|1': ['6.181%', '4.52%'],
                    'duration|1': ['120天', '1年'],
                    'minInvestAmount|1': ['5万', '10万'],
                    'status|1':['0','2','',''],
                    'cornerTip|1':['返现金','','爆款'],
                    'statusDesc': 'xxx'
                }]
            },
            'position|1-1000.2': 0
        }
    },
    // 当日系列持仓详情
    'sf/savings/position/detail': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
            "channelName": "蓝海银行",
            "productName": "“当日”系列产品",
            "title": "计息中，可随时支取",
            "orderStatus": 0,
            "productStatus": 1,
            "orderId": "savings-bob1538064403486",
            "interestRate": "5.07%",
            "duration": "最长持有5年，满期利率4.50%",
            "investAmount": "1,000.00",
            "latestIncome": "0.00",
            "orderMeta": [{
                "name": "计息时间",
                "value": "2018-09-28"
            }],
            "payback": {
                "handle": "提前支取或到期自动兑付",
                "content": "本产品回款由银行负责完成，资金将返回至您的银行电子账户，实际到账时间以银行最终处理时间为准。"
            },
            "hasInterestTips": 0,
            "savingsChannelId": "jdjr",
            "savingsProductId": "jdjr001"
        }
    },

    // 当日系列持仓电子账户余额
    'sf/savings/account/balance': {
        "resultCode": 0,
        "resultMsg": null,
        "resultData": {
            "channelCode": "cqfm",
            "balance": "5,0000.00",
            "flag|1": [1, 0]
        }
    },
};

function ResData(url) {
    var key, data;
    for (key in MockData) {
        if (url.indexOf(key) > -1) {
            data = MockJS.mock(MockData[key]);
            break;
        }
    }
    return data;
}

module.exports = ResData;
