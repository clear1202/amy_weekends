// 获取本地存储的打卡记录
let visitedPlaces = JSON.parse(localStorage.getItem('visitedPlaces')) || {};

// 当前筛选条件
let filters = {
    location: 'all',
    status: 'all',
    type: 'all'
};

// 地点数据
const places = [
    // 广州番禺区
    {
        name: "长隆野生动物世界",
        address: "广州市番禺区迎宾路",
        location: "广州",
        metro: "汉溪长隆站",
        intro: "亚洲最大的野生动物主题公园，拥有大熊猫、白虎等珍稀动物。设有动物表演、科普教育等互动项目，还有熊猫剧场、白虎山谷等特色景区。",
        fee: "成人票约300元，儿童票优惠",
        parking: "园区设有专用停车场，收费20元/次",
        type: "主题乐园"
    },
    {
        name: "长隆欢乐世界",
        address: "广州市番禺区迎宾路",
        location: "广州",
        metro: "汉溪长隆站",
        intro: "大型主题游乐园，拥有过山车、跳楼机等刺激项目，也有旋转木马等适合儿童的娱乐设施。园区内有精彩的巡游表演和夜间烟花表演。",
        fee: "成人票约280元，儿童票优惠",
        parking: "共享长隆停车场",
        type: "主题乐园"
    },
    {
        name: "大夫山森林公园",
        address: "广州市番禺区大夫山",
        location: "广州",
        metro: "市桥站",
        intro: "广州最大的城市森林公园，设有儿童游乐场、科普园区、自行车道等。空气清新，适合周末亲子游玩和野餐。",
        fee: "免费",
        parking: "有停车场，收费10元/次",
        type: "公园"
    },

    // 广州天河区
    {
        name: "正佳广场",
        address: "广州市天河区天河路228号",
        location: "广州",
        metro: "体育西路站",
        intro: "大型商业综合体，包含海洋馆、溜冰场、儿童乐园等多个亲子娱乐设施。室内场所，全年可玩。",
        fee: "海洋馆约180元，其他设施另计",
        parking: "商场地下停车场",
        type: "商场综合体"
    },
    {
        name: "天河公园",
        address: "广州市天河区天河路299号",
        location: "广州",
        metro: "天河公园站",
        intro: "市区大型综合公园，有儿童游乐设施、人工湖、身步道等。环境优美，设施完善，适合家庭休闲。",
        fee: "免费",
        parking: "有停车场，收费",
        type: "公园"
    },

    // 广州海珠区
    {
        name: "广州塔",
        address: "广州市海珠区阅江西路222号",
        location: "广州",
        metro: "广州塔站",
        intro: "广州地标建筑，设有观光层、旋转餐厅和空中漫步。夜景绚丽，塔内设有科普展示区。",
        fee: "观光票150元起",
        parking: "地下停车场",
        type: "文化景点"
    },
    {
        name: "海珠湿地公园",
        address: "广州市海珠区沙园路",
        location: "广州",
        metro: "赤岗站",
        intro: "城市湿地公园，可以观鸟、观景、科普学习。设有木栈道、观鸟屋等设施，是亲近自然的好去处。",
        fee: "免费",
        parking: "有停车场",
        type: "公园"
    },

    // 广州越秀区
    {
        name: "越秀公园",
        address: "广州市越秀区解放北路988号",
        location: "广州",
        metro: "越秀公园站",
        intro: "广州最大的综合性公园，有五羊石像、明代城墙等历史遗迹。环境优美，设施齐全，适合全家游玩。",
        fee: "免费",
        parking: "有停车场，收费",
        type: "公园"
    },
    {
        name: "广州动物园",
        address: "广州市越秀区先烈中路120号",
        location: "广州",
        metro: "动物园站",
        intro: "百年老zoo，饲养了数百种动物。除了观赏动物，还有科普馆和儿童游乐设施，票价实惠。",
        fee: "门票20元",
        parking: "有停车场",
        type: "主题乐园"
    },

    // 广州白云区
    {
        name: "白云山风景区",
        address: "广州市白云区白云山南路",
        location: "广州",
        metro: "白云山站",
        intro: "广州最著名的山岳公园，环境优美，适合亲子爬山、野餐。设有缆车等设施，方便游览。",
        fee: "门票5元",
        parking: "多个停车场可选",
        type: "公园"
    },
    {
        name: "云台花园",
        address: "广州市白云区云台花园",
        location: "广州",
        metro: "同和站",
        intro: "以兰花为主题的特色公园，环境优美，适合亲子科普和摄影。定期举办花展活动。",
        fee: "门票10元",
        parking: "有停车场",
        type: "公园"
    },

    // 佛山城区
    {
        name: "祖庙",
        address: "佛山市禅城区祖庙路21号",
        location: "佛山",
        metro: "祖庙站",
        intro: "国家5A级景区，展示佛山武术、铜铁工艺等非遗文化。设有互动体验区���可以参与传统手工艺制作。",
        fee: "门票75元",
        parking: "周边停车场",
        type: "文化景点"
    },
    {
        name: "岭南天地",
        address: "佛山市禅城区",
        location: "佛山",
        metro: "祖庙站",
        intro: "岭南文化特色街区，融合传统与现代。有功夫体验馆、非遗中心等，还有众多特色餐厅。",
        fee: "免费参观",
        parking: "地下停车场",
        type: "文化景点"
    },

    // 广州天河区
    {
        name: "广东科学中心",
        address: "广州市天河区宝冲路168号",
        location: "广州",
        metro: "科学城站",
        intro: "超大型科技馆，设有航天航空、机器人、物理、化学等多个主题展区。每个展区都有互动体验项目，周末有科学实验表演。适合3岁以上儿童，建议全天游玩。特别推荐机器人展区和太空舱模拟体验。",
        fee: "成人票120元，儿童票60元，1.2米以下免票",
        parking: "室内停车场，10元/小时",
        type: "科教场所"
    },
    {
        name: "玉翠园",
        address: "广州市天河区天河北路532号",
        location: "广州",
        metro: "林和西站",
        intro: "城市中心的亲子主题餐厅，环境优美，有室内外游乐区。餐厅提供健康儿童餐，周末有手工DIY活动。室外有沙池和滑梯，室内有积木区和图书角。非常适合带小朋友来吃饭玩耍。",
        fee: "人均80-120元，游乐设施免费",
        parking: "商场停车场",
        type: "特色餐厅"
    },

    // 广州海珠区
    {
        name: "海珠湖公园",
        address: "广州市海珠区海珠湖",
        location: "广州",
        metro: "万胜围站",
        intro: "超大型滨水公园，有5公里环湖步道，非常适合亲子运动。园内设有多个主题游乐场，还有观鸟区和科普长廊。周末有帆船体验和亲子划船活动。春季可以观赏樱花，秋季可以看红叶。",
        fee: "免费开放，部分游乐设施收费",
        parking: "多个免费停车场",
        type: "公园"
    },

    // 佛山顺德区
    {
        name: "顺德欢乐海岸PLUS",
        address: "佛山市顺德区乐从镇南路",
        location: "佛山",
        metro: "从站",
        intro: "大型亲子娱乐综合体，室内设有儿童乐园、海洋球池、攀爬设施等。户外有水上乐园和沙滩。特别推荐的是顶层的星空餐厅，可以一边吃饭一边看夜景。周末有街头艺人表演。",
        fee: "商场免费，游乐设施另收费",
        parking: "地下停车场，首2小时免费",
        type: "商场综合体"
    },
    {
        name: "顺德儿童公园",
        address: "佛山市顺德区大良街道德和路",
        location: "佛山",
        metro: "大良站",
        intro: "专门针对儿童设计的主题公园，分为科普区、运动区、戏水区等多个功能区。有专门的幼儿游乐设施，还有儿童交通体验区。周末举办各类亲子活动，如放风筝、手工制作等。",
        fee: "免费开放，部分项目收费",
        parking: "路边停车位",
        type: "公园"
    },

    // 周边区域-清远
    {
        name: "清远古龙峡",
        address: "清远市清城区古龙峡景区",
        location: "周边",
        metro: "需要自驾或包车",
        intro: "著名的漂流景区，设有不同难度的漂流线路，特别适合夏季亲子游玩。除了漂流，还有玻璃桥、丛林飞跃等项目。景区内有农家乐，可以品尝当地特色菜。建议避开暑假高峰期。",
        fee: "成人票158元起，儿童票半价",
        parking: "景区停车场20元/次",
        type: "户外景区"
    },

    // 广州白云区
    {
        name: "白云山风景名胜区",
        address: "广州市白云区广州大道北1389号",
        location: "广州",
        metro: "白云山站",
        intro: "广州最著名的登山胜地，有多条适合亲子的登山路线。摩星岭适合亲子徒步，白云山索道可以轻松登顶。山顶有儿童游乐场，还可以喂鱼和放风筝。春天可以赏花，秋天可以观枫叶。",
        fee: "成人票5元，1.2米以下儿童免费",
        parking: "停车场收费10元/次",
        type: "公园"
    },
    {
        name: "白云湖公园",
        address: "广州市白云区同泰路",
        location: "广州",
        metro: "同和站",
        intro: "环湖公园，设有儿童游乐区、科普园地、垂钓区等。湖边有观鸟屋，可以近距离观察水鸟。周末有手工艺品制作活动，节假日有文艺表演。",
        fee: "免费",
        parking: "免费停车场",
        type: "公园"
    },

    // 广州天河区
    {
        name: "华南植物园",
        address: "广州市天河区兴科路723号",
        location: "广州",
        metro: "植物园站",
        intro: "亚洲最大的植物园之一，设有温室、药用植物区、儿童植物科普区等。可以参加植物认知、插花、制作植物标本等亲子活动。春季赏花最佳，建议携带防蚊喷雾。",
        fee: "门票35元，1.2米以下儿童免费",
        parking: "停车场10元/次",
        type: "科教场所"
    },
    {
        name: "广东科技馆",
        address: "广州市天河区珠江新城猎德大道182号",
        location: "广州",
        metro: "猎德站",
        intro: "现代化科技馆，设有航天、机器人、物理、生物等多个互动展区。定期举办科学实验秀和科普讲座。特别推荐4D影院和模拟驾驶舱体验。",
        fee: "成人票80元，儿童票40元",
        parking: "地下停车场",
        type: "科教场所"
    },

    // 广州海珠区
    {
        name: "广州儿童公园",
        address: "广州市海珠区新港东路",
        location: "广州",
        metro: "赤岗站",
        intro: "专门为儿童设计的主题公园，分为游乐区、科普区、运动区等。有旋转木马、小火车、迷过山车等设施。周末有小丑表演和魔术表演。",
        fee: "免费入园，游乐设施另收费",
        parking: "有停车场",
        type: "公园"
    },
    {
        name: "广州图书馆少儿馆",
        address: "广州市海珠区阅江西路",
        location: "广州",
        metro: "广州塔站",
        intro: "现代化儿童图书馆，藏书丰富，环境舒适。设有故事角、多媒体阅览区、亲子阅读区。定期举办绘本阅读会和创意手工活动。",
        fee: "免费",
        parking: "地下停车场",
        type: "科教场所"
    },

    // 广州荔湾区
    {
        name: "荔湾湖公园",
        address: "广州市荔湾区龙津西路",
        location: "广州",
        metro: "陈家祠站",
        intro: "岭南园林风格公园，有百年荔枝树和古建筑群。湖中有游船可乘，园内有儿童游乐设施。周末有粤剧表演，节假日有民俗活动。",
        fee: "免费",
        parking: "收费停车场",
        type: "公园"
    },
    {
        name: "陈家祠",
        address: "广州市荔湾区中山七路",
        location: "广州",
        metro: "陈家祠站",
        intro: "清代建筑群，是了解岭南建筑艺术的最佳去处。专门的儿童导览线路，可以参与木雕拓印、剪纸等传统文化体验活动。",
        fee: "成人票10元，儿童5元",
        parking: "路边停车",
        type: "文化景点"
    },

    // 佛山禅城区
    {
        name: "佛山科技馆",
        address: "佛山市禅城区季华五路",
        location: "佛山",
        metro: "季华园站",
        intro: "现代化科技场馆，设有机器人、航天、声光电等互动展区。有专门的儿童科技乐园，可以参与各种科学实验。周末有科普表演。",
        fee: "成人票50元，儿童票25元",
        parking: "免费停车场",
        type: "科教场所"
    },
    {
        name: "南风古灶",
        address: "佛山市禅城区南风路",
        location: "佛山",
        metro: "南风站",
        intro: "千年古窑址，可以了解陶瓷制作工艺。有陶艺体验区，可以参与拉坯、彩绘等活动。设有专门的儿童陶艺工作室。",
        fee: "门票45元，含陶艺体验",
        parking: "路边停车",
        type: "文化景点"
    },

    // 广州天河区（新增）
    {
        name: "太古汇亲子乐园",
        address: "广州市天河区天河路385号",
        location: "广州",
        metro: "石牌桥站",
        intro: "高端商场内的室内游乐场，环境优雅，设施新颖。有攀爬区、滑梯区、积木区等，适合2-8岁儿童。",
        fee: "88元/小时",
        parking: "商场停车场",
        type: "室内游乐场"
    },
    {
        name: "天河城儿童乐园",
        address: "广州市天河区天河路208号",
        location: "广州",
        metro: "体育西路站",
        intro: "大型商场内的儿童娱乐区，设有旋转木马、迷你过山车等设施。周末有小丑表演和魔术表演。",
        fee: "150元/人",
        parking: "商场停车场",
        type: "室内游乐场"
    },

    // 广州越秀区（新增）
    {
        name: "广州儿童图书馆",
        address: "广州市越秀区环市东路213号",
        location: "广州",
        metro: "东山口站",
        intro: "专业儿童图书馆，藏书丰富，环境舒适。定期举办故事会和手工活动。设有婴幼儿阅读区。",
        fee: "免费",
        parking: "路边停车",
        type: "科教场所"
    },
    {
        name: "中山纪念堂",
        address: "广州市越秀区东风中路373号",
        location: "广州",
        metro: "纪念堂站",
        intro: "史建筑，建筑风格独特。有专门的儿童历史文化导览，可以参与互动体验活动。",
        fee: "免费",
        parking: "公共停车场",
        type: "文化景点"
    },

    // 广州海珠区（新增）
    {
        name: "广州大剧院",
        address: "广州市海珠区珠江新城珠江西路1号",
        location: "广州",
        metro: "歌剧院站",
        intro: "现代化剧院，经常举办儿童剧目和音乐会。建筑造型独特，有专门的儿童艺术体验区。",
        fee: "演出票价不等",
        parking: "地下停车场",
        type: "文化景点"
    },
    {
        name: "二沙岛公园",
        address: "广州市海珠区二沙岛大通路",
        location: "广州",
        metro: "客村站",
        intro: "滨江公园，环境优美，适合野餐和放风筝。设有儿童游乐设施，晚上可以看珠江夜景。",
        fee: "免费",
        parking: "免费停车",
        type: "公园"
    },

    // 广州番禺区（新增）
    {
        name: "番禺百万葵园",
        address: "广州市番禺区化龙镇市莲路",
        location: "广州",
        metro: "市桥站转乘公交",
        intro: "以向日葵为主题的生态园，花海景观壮。设有儿童游乐区、科普区和观光小火车。",
        fee: "60元/人",
        parking: "免费停车",
        type: "主题公园"
    },
    {
        name: "番禺宝墨园",
        address: "广州市番禺区市桥街桥兴大道",
        location: "广州",
        metro: "市桥站",
        intro: "岭南园林，环境优美，有水上表演和民俗表演。可以体验传统文化，参与手工制作。",
        fee: "45元/人",
        parking: "免费停车",
        type: "文化景点"
    }

    // 继续添加更多地点...
];

// 渲染地点卡片
function renderPlaceCard(place) {
    const visitInfo = visitedPlaces[place.name] || { count: 0, notes: [] };
    const isVisited = visitInfo.count > 0;
    
    return `
        <div class="card ${isVisited ? 'checked' : ''} bg-white rounded-lg overflow-hidden transition-all duration-300">
            <div class="p-6">
                <h2 class="text-xl font-bold mb-4">${place.name}</h2>
                
                <div class="space-y-3">
                    <div class="flex items-start">
                        <span class="font-bold w-20">地址：</span>
                        <span class="flex-1">${place.address}</span>
                    </div>
                    
                    ${place.metro ? `
                        <div class="flex items-center">
                            <span class="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                                🚇 ${place.metro}
                            </span>
                        </div>
                    ` : ''}
                    
                    <p class="text-gray-600">
                        ${place.intro}
                    </p>
                    
                    <div class="flex items-start">
                        <span class="font-bold w-20">费用：</span>
                        <span class="flex-1">${place.fee}</span>
                    </div>
                    
                    <div class="flex items-start">
                        <span class="font-bold w-20">停车：</span>
                        <span class="flex-1">${place.parking}</span>
                    </div>

                    ${isVisited ? `
                        <div class="mt-4">
                            <div class="flex items-center justify-between mb-2">
                                <span class="font-bold text-green-600">已打卡 ${visitInfo.count} 次</span>
                            </div>
                            ${visitInfo.notes.map(note => `
                                <div class="bg-green-50 p-3 rounded-lg mb-2">
                                    <p class="text-sm text-gray-600">${note}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>

                <div class="mt-6 space-y-3">
                    <button 
                        onclick="showCheckinDialog('${place.name}')"
                        class="w-full py-2 rounded-lg transition-colors bg-blue-500 text-white hover:bg-blue-600"
                    >
                        ${isVisited ? '再次打卡' : '打卡'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 显示打卡对话框
function showCheckinDialog(placeName) {
    const dialog = document.createElement('div');
    dialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    dialog.innerHTML = `
        <div class="bg-white p-6 rounded-lg w-96 max-w-[90%]">
            <h3 class="text-xl font-bold mb-4">添加打卡记录</h3>
            <textarea 
                id="checkin-note" 
                class="w-full h-32 p-3 border rounded-lg mb-4" 
                placeholder="记录这次的游玩感受..."
            ></textarea>
            <div class="flex justify-end space-x-3">
                <button 
                    onclick="this.closest('.fixed').remove()" 
                    class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                    取消
                </button>
                <button 
                    onclick="submitCheckin('${placeName}')" 
                    class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                    确认打卡
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);
}

// 提交打卡记录
function submitCheckin(placeName) {
    const noteText = document.getElementById('checkin-note').value.trim();
    if (!noteText) {
        alert('请输入打卡记录');
        return;
    }

    // 更新打卡记录
    if (!visitedPlaces[placeName]) {
        visitedPlaces[placeName] = { count: 0, notes: [] };
    }
    visitedPlaces[placeName].count += 1;
    visitedPlaces[placeName].notes.unshift(noteText);

    // 保存到本地存储
    localStorage.setItem('visitedPlaces', JSON.stringify(visitedPlaces));

    // 关闭对话框并刷新显示
    document.querySelector('.fixed').remove();
    renderPlaces();
}

// 筛选地点
function filterPlaces(filterType, value) {
    filters[filterType] = value;
    renderPlaces();
}

// 渲染所有地点
function renderPlaces() {
    const container = document.getElementById('places-container');
    
    // 根据当前筛选条件过滤地点
    let filteredPlaces = places.filter(place => {
        // 地域筛选
        if (filters.location !== 'all' && place.location !== filters.location) {
            return false;
        }
        
        // 类型筛选
        if (filters.type !== 'all' && place.type !== filters.type) {
            return false;
        }
        
        // 打卡状态筛选
        const isVisited = visitedPlaces[place.name]?.count > 0;
        if (filters.status === 'checked' && !isVisited) {
            return false;
        }
        if (filters.status === 'unchecked' && isVisited) {
            return false;
        }
        
        return true;
    });
    
    // 添加调试信息
    console.log('当前筛选条件:', filters);
    console.log('筛选后的地点数量:', filteredPlaces.length);
    
    container.innerHTML = filteredPlaces.map(renderPlaceCard).join('');
}

// 初始化应用
function initApp() {
    // 监听下拉菜单变化
    const locationFilter = document.getElementById('location-filter');
    const typeFilter = document.getElementById('type-filter');
    const statusFilter = document.getElementById('status-filter');

    locationFilter.addEventListener('change', (e) => {
        console.log('地区筛选变化:', e.target.value);
        filterPlaces('location', e.target.value);
    });
    
    typeFilter.addEventListener('change', (e) => {
        console.log('类型筛选变化:', e.target.value);
        filterPlaces('type', e.target.value);
    });
    
    statusFilter.addEventListener('change', (e) => {
        console.log('状态筛选变化:', e.target.value);
        filterPlaces('status', e.target.value);
    });

    // 添加随机出行按钮事件
    document.getElementById('random-place').addEventListener('click', showRandomPlace);

    // 初始渲染
    renderPlaces();
}

// 显示随机地点
function showRandomPlace() {
    // 获取当前筛选后的地点
    const filteredPlaces = places.filter(place => {
        if (filters.location !== 'all' && place.location !== filters.location) {
            return false;
        }
        const isVisited = visitedPlaces[place.name]?.count > 0;
        if (filters.status === 'checked' && !isVisited) {
            return false;
        }
        if (filters.status === 'unchecked' && isVisited) {
            return false;
        }
        return true;
    });

    if (filteredPlaces.length === 0) {
        alert('当前筛选条件下没有可选择的地点');
        return;
    }

    // 随机选择一个地点
    const randomIndex = Math.floor(Math.random() * filteredPlaces.length);
    const randomPlace = filteredPlaces[randomIndex];

    // 创建弹窗显示随机地点
    const dialog = document.createElement('div');
    dialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    dialog.innerHTML = `
        <div class="bg-white p-8 rounded-2xl w-[90%] max-w-2xl transform transition-all duration-300 scale-95 opacity-0">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-purple-600">今天去这里吧！✨</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            ${renderPlaceCard(randomPlace)}
        </div>
    `;
    document.body.appendChild(dialog);

    // 添加动画效果
    requestAnimationFrame(() => {
        dialog.querySelector('.scale-95').classList.remove('scale-95', 'opacity-0');
    });
}

// 启动应用
document.addEventListener('DOMContentLoaded', initApp); 