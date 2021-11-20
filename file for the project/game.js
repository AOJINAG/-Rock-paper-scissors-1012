var backLayer, resultLayer, titleLayer, clickLayer, selfBitmap, enermyBitmap, textFieldAll, textFieldLoss, textFieldWin;
var win = loss = draw = 0;

init(50, "mylegend", 900, 500, load);
var imgList = {};
//add images there 
var imgData = new Array(
    { name: "rock", path: "image/images/rock.jpg" },
    { name: "scissors", path: "image/images/scissors.jpg" },
    { name: "paper", path: "image/images/paper.jpg" }
);
var showList = new Array();

function load() {
    backLayer = new LSprite();
    addChild(backLayer);
    var loadingLayer = new LoadingSample3();
    backLayer.addChild(loadingLayer);
    LLoadManage.load(
        imgData,
        function (progress) {
            loadingLayer.setProgress(progress);
        },
        function (result) {
            imgList = result;
            backLayer.removeChild(loadingLayer);
            loadingLayer = null;
            gameinit();
        }

    );

}

function gameinit() {
    showList.push(new LBitmapData(imgList["rock"]));
    showList.push(new LBitmapData(imgList["scissors"]));
    showList.push(new LBitmapData(imgList["paper"]));
    backLayer.graphics.drawRect(1, "red", [0, 0, 900, 500], true, "pink");
    addChild(backLayer);
    var textField = new LTextField();
    textField.text = "Player";
    textField.font = "微软雅黑";  // 微软雅黑 = font //
    textField.weight = "bolder";
    textField.size = 40;
    textField.x = "300";
    textField.y = "150";
    addChild(textField);

    var textField = new LTextField();
    textField.text = "AI";
    textField.font = "微软雅黑";
    textField.weight = "bolder";
    textField.size = 40;
    textField.x = "650";
    textField.y = "150";
    addChild(textField);
    /* line */
    var lgraphics = new LGraphics();
    lgraphics.drawLine(3, "#7F93C7", [500, 150, 500, 350]);
    addChild(lgraphics);
    //Player
    selfBitmap = new LBitmap(showList[0]);
    selfBitmap.x = 280;
    selfBitmap.y = 200;
    backLayer.addChild(selfBitmap);
    //AI
    enermyBitmap = new LBitmap(showList[0]);
    enermyBitmap.x = 630;
    enermyBitmap.y = 200;
    backLayer.addChild(enermyBitmap);
    title();

}


function title() {
    titleLayer = new LSprite();
    titleLayer.graphics.drawRect(1, "blue", [0, 0, 900, 100], true, "green");
    addChild(titleLayer);
    var textField = new LTextField();
    textField.text = "Rock papers and cissors";
    textField.font = "微软雅黑";
    textField.size = 30;
    textField.weight = "bolder";
    textField.color = "#FFFFFF";
    textField.x = 350;
    textField.y = 50;
    addChild(textField);
    result();
}


function result() {
    resultLayer = new LSprite();
    resultLayer.graphics.drawRect(1, "blue", [0, 100, 180, 400], true, "#E1B264");
    addChild(resultLayer);
    textFieldAll = new LTextField();
    textFieldAll.x = 35;
    textFieldAll.y = 150;
    textFieldAll.text = "Round：0";
    textFieldAll.font = "微软雅黑";
    textFieldAll.weight = "bolder";
    addChild(textFieldAll);

    textFieldDraw = new LTextField();
    textFieldDraw.x = 35;
    textFieldDraw.y = 170;
    textFieldDraw.text = "Draw：0";
    textFieldDraw.font = "微软雅黑";
    textFieldDraw.weight = "bolder";
    addChild(textFieldDraw);

    textFieldWin = new LTextField();
    textFieldWin.x = 35;
    textFieldWin.y = 190;
    textFieldWin.text = "Win：0";
    textFieldWin.font = "微软雅黑";
    textFieldWin.weight = "bolder";
    addChild(textFieldWin);

    textFieldLoss = new LTextField();
    textFieldLoss.x = 35;
    textFieldLoss.y = 210;
    textFieldLoss.text = "Lose：0";
    textFieldLoss.font = "微软雅黑";
    textFieldLoss.weight = "bolder";
    addChild(textFieldLoss);
    click();
}

function click() {
    clickLayer = new LSprite();
    clickLayer.graphics.drawRect(1, "blue", [180, 400, 720, 100], true, "#E1B264");
    addChild(clickLayer);
    var textField = new LTextField();
    textField.x = 188;
    textField.y = 411;
    textField.text = "You Turn:";
    textField.font = "微软雅黑";
    textField.weight = "bolder";
    addChild(textField);

    var btnShitou = getButton("rock");
    btnShitou.x = 250;
    btnShitou.y = 410;
    clickLayer.addChild(btnShitou);
    btnShitou.addEventListener(LMouseEvent.MOUSE_UP, onclick);

    var btnJiandao = getButton("scissors");
    btnJiandao.x = 350;
    btnJiandao.y = 410;
    clickLayer.addChild(btnJiandao); btnJiandao.addEventListener(LMouseEvent.MOUSE_UP, onclick);

    var btnBu = getButton("paper");
    btnBu.x = 450;
    btnBu.y = 410;
    clickLayer.addChild(btnBu);
    btnBu.addEventListener(LMouseEvent.MOUSE_UP, onclick);

}

function onclick(event, display) {
    var selfValue, enermyValue;
    if (display.name == "rock") {
        selfValue = 0;
    } else if (display.name == "scissors") {
        selfValue = 1;
    } else if (display.name == "paper") {
        selfValue = 2;
    } else {
        alert("未知错误...");
    }
    enermyValue = Math.floor(Math.random() * 3);
    enermyBitmap.bitmapData = showList[enermyValue];
    selfBitmap.bitmapData = showList[selfValue];

    var checkList = [
        [0, 1, -1],
        [-1, 0, 1],
        [1, -1, 0]
    ];

    var result = checkList[selfValue][enermyValue];
    if (result == 1) {
        win += 1;
    } else if (result == -1) {
        loss += 1;
    } else {
        draw += 1;
    }
    textFieldAll.text = "Round：" + (win + loss + draw);
    textFieldDraw.text = "Draw：" + draw;
    textFieldWin.text = "Win：" + win;
    textFieldLoss.text = "Lose：" + loss;

}

function getButton(value) {
    var btnUp = new LBitmap(new LBitmapData(imgList[value]));
    btnUp.scaleX = 0.5;
    btnUp.scaleY = 0.5;
    var btnOver = new LBitmap(new LBitmapData(imgList[value]));
    btnOver.scaleX = 0.5;
    btnOver.scaleY = 0.5;
    btnOver.x = 2;
    btnOver.y = 2;
    var btn = new LButton(btnUp, btnOver);
    btn.name = value;
    return btn;
}
