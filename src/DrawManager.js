﻿import { glob } from './Global'
export default class DrawManager
{
    drawGameField() {
        let g = glob();
        var c = document.getElementById(g.canvasId);
        var ctx = c.getContext("2d");
        let path1 = new Path2D();
        ctx.beginPath();
        ctx.lineWidth = g.borderWidthFieldgame;
        ctx.strokeStyle = "black";
        let leftFieldgamePos = Number(g.leftFieldgamePos);
        let topFieldgamePos = Number(g.topFieldgamePos);
        let widthFieldgame = Number(g.widthFieldgame);
        let heightFieldgame = Number(g.heightFieldgame);
        path1.rect(leftFieldgamePos, topFieldgamePos, widthFieldgame, heightFieldgame);
        ctx.stroke(path1);
        //draw cells for checkers: enough to draw vertical lines that separate cells
        let cellsCount = Number(g.cellsCount);
        let cellWidth = Number(g.widthFieldgame) / cellsCount;
        for (var i = 0; i < cellsCount; i++) {

            ctx.beginPath();
            ctx.moveTo(leftFieldgamePos + i * cellWidth, topFieldgamePos);
            ctx.lineTo(leftFieldgamePos + i * cellWidth, topFieldgamePos + heightFieldgame);
            ctx.stroke();
        }
    }

    drawChecker(checker) {
        let g = glob();
        const color = checker.color;
        const centerX = checker.centerX;
        const centerY = checker.centerY;
        const checkerRadius = checker.checkerRadius;
        var c = document.getElementById(g.canvasId);

        var ctx = c.getContext("2d");
        let path1 = new Path2D();

        ctx.beginPath();

        ctx.arc(centerX, centerY, checkerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke(path1);

    }

    createCheckers = () => {
        let result = [];
        let g = glob();
        let cellsCount = Number(g.cellsCount);
        let emptyCellIndex = Math.floor(cellsCount / 2);
        //get game field location and dumensions to define place of current checker
        let leftFieldgamePos = Number(g.leftFieldgamePos);
        let topFieldgamePos = Number(g.topFieldgamePos);
        let widthFieldgame = Number(g.widthFieldgame);
        let heightFieldgame = Number(g.heightFieldgame);

        let cellWidth = Number(widthFieldgame) / cellsCount;
        for (var i = 0; i < cellsCount; i++) {
            let checker = {};
            checker.cellId = i + 1;
            checker.color = g.emptyCheckerColor;
            if (i < emptyCellIndex)
                checker.color = g.leftCheckerColor;
            if (i > emptyCellIndex)
                checker.color = g.rightCheckerColor;
            checker.centerX = leftFieldgamePos + (checker.cellId - 1) * cellWidth + cellWidth / 2;
            checker.centerY = topFieldgamePos + heightFieldgame / 2;
            checker.checkerRadius = Number(g.checkerRadius);

            //let checker = new Checker(props);
            //let checker = props;


            result.push(checker);
        }

        return result;
    }
    redrawCheckers = (checkers) => {

        checkers.map(checker => this.drawChecker(checker));
    }
    addMoveToProtocol = (move) =>
    {
        let moveStr = move[0] + " => " + move[1];
        let txtProtocol = document.getElementById("txtProtocol");
        if (txtProtocol.textContent.trim() === "")
            txtProtocol.textContent = txtProtocol.textContent.trim();
        txtProtocol.textContent += moveStr + ";" //"\r\n";
    }
    rewriteProtocol = (moves) =>
    {
        let txtProtocol = document.getElementById("txtProtocol");
        txtProtocol.textContent = "";
        moves.map(move => this.addMoveToProtocol(move));
    }
}