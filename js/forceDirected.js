/**
 * Created by Administrator on 2016/6/25.
 */
function forceDirected() {
    var nodes = [{name: "学习知识"}, {name: "Javascript"},//0,1
        {name: "Html5(精通)"}, {name: "Css3"},//2,3
        {name: "Bootstrap"}, {name: "D3"},//4,5
        {name: "EasyUI"}, {name: 'XML'},//6,7
        {name: 'Json'}, {name: 'Java'},//8,9
        {name: 'Jsp'}, {name: 'HighChart'},//10,11
        {name: '项目'}, {name: '花瓣网'},//12,13
        {name: "Html5(精通)"}, {name: "Css3"},//14,15
        {name: "Bootstrap"}, {name: "D3"},//16,17
        {name: '个人相册'},//18
        {name: "Html5(精通)"}, {name: "Css3"},//19,20
        {name: "Bootstrap"}, {name: "Javascript"},//21,22
        {name: '图书管理系统'},//23
        {name: "Html5(精通)"}, {name: "Css3"},//24,25
        {name: "Bootstrap"}, {name: "Javascript"},//26,27
    ];

    var edges = [{source: 0, target: 1}, {source: 0, target: 2},
        {source: 0, target: 3}, {source: 0, target: 4},
        {source: 0, target: 5}, {source: 0, target: 6}, {source: 0, target: 7},
        {source: 0, target: 8}, {source: 0, target: 9}, {source: 0, target: 10},
        {source: 0, target: 11}, {source: 12, target: 13}, {source: 12, target: 18}, {source: 12, target: 23},
        {source: 13, target: 15}, {source: 13, target: 14}, {source: 13, target: 16}, {source: 13, target: 17},
        {source: 18, target: 20}, {source: 18, target: 21}, {source: 18, target: 22}, {source: 18, target: 19},
        {source: 23, target: 24}, {source: 23, target: 25}, {source: 23, target: 26}, {source: 23, target: 27}];

    var width = 1300;
    var height = 600;


    forceDirected.prototype.forceStart = function () {

        var svg = d3.select(".selfIntroduce")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        var force = d3.layout.force()
            .nodes(nodes)		//指定节点数组
            .links(edges)		//指定连线数组
            .size([width, height])	//指定范围
            .linkDistance(130)	//指定连线长度
            .charge(-500);	//相互之间的作用力

        force.start();

//添加连线
        var svg_edges = svg.selectAll("line")
            .data(edges)
            .enter()
            .append("line")
            .style("stroke", "#ccc")
            .style("stroke-width", 2);

        var color = d3.scale.category20();

//添加节点
        var svg_nodes = svg.selectAll("circle")
            .data(nodes).data(nodes)
            .enter()
            .append("circle")
            .attr("r", 20)
            .style("fill", function (d, i) {
                return color(i);
            })
            .call(force.drag);	//使得节点能够拖动

//添加描述节点的文字
        var svg_texts = svg.selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .style("fill", "black")
            .attr("dx", 20)
            .attr("dy", 8)
            .text(function (d) {
                return d.name;
            }).style("fill", function (d, i) {
                return color(i);
            });


        force.on("tick", function () {	//对于每一个时间间隔
            //更新连线坐标
            svg_edges.attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            //更新节点坐标
            svg_nodes.attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });

            //更新文字坐标
            svg_texts.attr("x", function (d) {
                    return d.x;
                })
                .attr("y", function (d) {
                    return d.y;
                });
        });

    };
}

var force= new forceDirected();
force.forceStart();