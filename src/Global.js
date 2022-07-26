export function glob() {
    const res = {};
    res.canvasId = "canvas1";
    res.cellsCount = 7;
    res.leftFieldgamePos = 250;
    res.topFieldgamePos = 10;
    res.widthFieldgame = 350;
    res.heightFieldgame = 50;
    res.borderWidthFieldgame = 2;
    res.checkerRadius = 20;
    res.leftCheckerColor = "black";
    res.rightCheckerColor = "green";
    res.emptyCheckerColor = "white";
    res.solution = [
        [3, 4], [5, 3], [6, 5], [4, 6],
        [2, 4], [1, 2], [3, 1], [5, 3],
        [7, 5], [6, 7], [4, 6],
        [2, 4], [3, 2], [5, 3], [4, 5]
    ]
    return res;
}
export default glob;
