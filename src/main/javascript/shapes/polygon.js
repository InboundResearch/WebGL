let makeFan = $.makeFan = function (name, outline, texture) {
    // outline is an array of Float2 in XY, defining a closed, convex polygon (connecting the last vertex
    // to the first) on the z = 0 plane. the normal is [0, 0, 1].

    return Shape.new ({
        buffers: function () {
            LOG (LogLevel.TRACE, "Make fan: " + name);
            let builder = ShapeBuilder.new ();

            let normal = [0, 0, 1]

            // add the vertices
            for (let n = 0, last = outline.length; n < last; ++n) {
                if (typeof texture !== "undefined") {
                    builder.addVertexNormalTexture([outline[n][0], outline[n][1], 0], normal, texture[n]);
                } else {
                    builder.addVertexNormal([outline[n][0], outline[n][1], 0], normal);
                }
            }

            // now aggregate the face indices
            let indices = [];
            for (let n = 1, last = outline.length - 1; n < last; ++n) {
                indices.push (0);
                indices.push (n);
                indices.push (n + 1);
            }
            builder.addFace (indices);

            return builder.makeBuffers ();
        }
    }, name);
};

let makeSquare = function () {
    makeFan("square",
        [ [ 1.0,  1.0], [-1.0,  1.0], [-1.0, -1.0], [ 1.0, -1.0] ],
        [ [1.0, 0.0], [0.0,  0.0], [0.0, 1.0], [1.0, 1.0] ]
    );
};
