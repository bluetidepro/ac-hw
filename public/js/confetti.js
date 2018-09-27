/* Original Script "Confetti" by Patrik Svensson (http://metervara.net) */
/* Modified by Zach Reed for ac-hw */

$(document).ready(function() {
    var frameRate = 60;
    var dt = 1.0 / frameRate;
    var DEG_TO_RAD = Math.PI / 180;
    var RAD_TO_DEG = 180 / Math.PI;
    var colors = [
        ["#E3EBFC", "#356AE6"],
        ["#4fcaa6", "#246c56"],
        ["#3284e1", "#ced4df"],
        ["#19CCA3", "#006e54"]
    ];

    function Vector2(_x, _y) {
        this.x = _x, this.y = _y;
        this.Length = function() {
            return Math.sqrt(this.SqrLength());
        }
        this.SqrLength = function() {
            return this.x * this.x + this.y * this.y;
        }
        this.Equals = function(_vec0, _vec1) {
            return _vec0.x == _vec1.x && _vec0.y == _vec1.y;
        }
        this.Add = function(_vec) {
            this.x += _vec.x;
            this.y += _vec.y;
        }
        this.Sub = function(_vec) {
            this.x -= _vec.x;
            this.y -= _vec.y;
        }
        this.Div = function(_f) {
            this.x /= _f;
            this.y /= _f;
        }
        this.Mul = function(_f) {
            this.x *= _f;
            this.y *= _f;
        }
        this.Normalize = function() {
            var sqrLen = this.SqrLength();
            if (sqrLen != 0) {
                var factor = 1.0 / Math.sqrt(sqrLen);
                this.x *= factor;
                this.y *= factor;
            }
        }
        this.Normalized = function() {
            var sqrLen = this.SqrLength();
            if (sqrLen != 0) {
                var factor = 1.0 / Math.sqrt(sqrLen);
                return new Vector2(this.x * factor, this.y * factor);
            }
            return new Vector2(0, 0);
        }
    }
    Vector2.Lerp = function(_vec0, _vec1, _t) {
        return new Vector2((_vec1.x - _vec0.x) * _t + _vec0.x, (_vec1.y - _vec0.y) * _t + _vec0.y);
    }
    Vector2.Distance = function(_vec0, _vec1) {
        return Math.sqrt(Vector2.SqrDistance(_vec0, _vec1));
    }
    Vector2.SqrDistance = function(_vec0, _vec1) {
        var x = _vec0.x - _vec1.x;
        var y = _vec0.y - _vec1.y;
        return (x * x + y * y + z * z);
    }
    Vector2.Scale = function(_vec0, _vec1) {
        return new Vector2(_vec0.x * _vec1.x, _vec0.y * _vec1.y);
    }
    Vector2.Min = function(_vec0, _vec1) {
        return new Vector2(Math.min(_vec0.x, _vec1.x), Math.min(_vec0.y, _vec1.y));
    }
    Vector2.Max = function(_vec0, _vec1) {
        return new Vector2(Math.max(_vec0.x, _vec1.x), Math.max(_vec0.y, _vec1.y));
    }
    Vector2.ClampMagnitude = function(_vec0, _len) {
        var vecNorm = _vec0.Normalized;
        return new Vector2(vecNorm.x * _len, vecNorm.y * _len);
    }
    Vector2.Sub = function(_vec0, _vec1) {
        return new Vector2(_vec0.x - _vec1.x, _vec0.y - _vec1.y, _vec0.z - _vec1.z);
    }

    function EulerMass(_x, _y, _mass, _drag) {
        this.position = new Vector2(_x, _y);
        this.mass = _mass;
        this.drag = _drag;
        this.force = new Vector2(0, 0);
        this.velocity = new Vector2(0, 0);
        this.AddForce = function(_f) {
            this.force.Add(_f);
        }
        this.Integrate = function(_dt) {
            var acc = this.CurrentForce(this.position);
            acc.Div(this.mass);
            var posDelta = new Vector2(this.velocity.x, this.velocity.y);
            posDelta.Mul(_dt);
            this.position.Add(posDelta);
            acc.Mul(_dt);
            this.velocity.Add(acc);
            this.force = new Vector2(0, 0);
        }
        this.CurrentForce = function(_pos, _vel) {
            var totalForce = new Vector2(this.force.x, this.force.y);
            var speed = this.velocity.Length();
            var dragVel = new Vector2(this.velocity.x, this.velocity.y);
            dragVel.Mul(this.drag * this.mass * speed);
            totalForce.Sub(dragVel);
            return totalForce;
        }
    }

    function ConfettiPaper(_x, _y) {
        this.pos = new Vector2(_x, _y);
        this.rotationSpeed = Math.random() * 600 + 800;
        this.angle = DEG_TO_RAD * Math.random() * 360;
        this.rotation = DEG_TO_RAD * Math.random() * 360;
        this.cosA = 1.0;
        this.size = 5.0;
        this.oscillationSpeed = Math.random() * 1.5 + 0.5;
        this.xSpeed = 40.0;
        this.ySpeed = Math.random() * 60 + 50.0;
        this.corners = new Array();
        this.time = Math.random();
        var ci = Math.round(Math.random() * (colors.length - 1));
        this.frontColor = colors[ci][0];
        this.backColor = colors[ci][1];
        for (var i = 0; i < 4; i++) {
            var dx = Math.cos(this.angle + DEG_TO_RAD * (i * 90 + 45));
            var dy = Math.sin(this.angle + DEG_TO_RAD * (i * 90 + 45));
            this.corners[i] = new Vector2(dx, dy);
        }
        this.Update = function(_dt) {
            this.time += _dt;
            this.rotation += this.rotationSpeed * _dt;
            this.cosA = Math.cos(DEG_TO_RAD * this.rotation);
            this.pos.x += Math.cos(this.time * this.oscillationSpeed) * this.xSpeed * _dt
            this.pos.y += this.ySpeed * _dt;
            if (this.pos.y > ConfettiPaper.bounds.y) {
                this.pos.x = Math.random() * ConfettiPaper.bounds.x;
                this.pos.y = 0;
            }
        }
        this.Draw = function(_g) {
            if (this.cosA > 0) {
                _g.fillStyle = this.frontColor;
            } else {
                _g.fillStyle = this.backColor;
            }
            _g.beginPath();
            _g.moveTo(this.pos.x + this.corners[0].x * this.size, this.pos.y + this.corners[0].y * this.size * this.cosA);
            for (var i = 1; i < 4; i++) {
                _g.lineTo(this.pos.x + this.corners[i].x * this.size, this.pos.y + this.corners[i].y * this.size * this.cosA);
            }
            _g.closePath();
            _g.fill();
        }
    }
    ConfettiPaper.bounds = new Vector2(0, 0);
    confetti = {};
    confetti.Context = function(parent) {
        var i = 0;
        var canvasParent = document.getElementById(parent);
        var canvas = document.createElement('canvas');
        canvas.width = canvasParent.offsetWidth;
        canvas.height = canvasParent.offsetHeight;
        canvasParent.appendChild(canvas);
        var context = canvas.getContext('2d');
        var interval = null;
        var rpCount = 30;
        var rpDist = 8.0;
        var rpThick = 8.0;
        var confettiPaperCount = 50;
        var confettiPapers = new Array();
        ConfettiPaper.bounds = new Vector2(canvas.width, canvas.height);
        for (i = 0; i < confettiPaperCount; i++) {
            confettiPapers[i] = new ConfettiPaper(Math.random() * canvas.width, Math.random() * canvas.height);
        }
        this.resize = function() {
            canvas.width = canvasParent.offsetWidth;
            canvas.height = canvasParent.offsetHeight;
            ConfettiPaper.bounds = new Vector2(canvas.width, canvas.height);
        }
        this.start = function() {
            this.stop()
            var context = this
            this.interval = setInterval(function() {
                confetti.update();
            }, 1000.0 / frameRate)
            setTimeout(this.stop, 3000);
        }
        this.stop = function() {
            clearInterval(this.interval);
        }
        this.update = function() {
            var i = 0;
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (i = 0; i < confettiPaperCount; i++) {
                confettiPapers[i].Update(dt);
                confettiPapers[i].Draw(context);
            }
        }
    }
    var confetti = new confetti.Context('Confetti');
    confetti.start();
    $(window).resize(function() {
        confetti.resize();
    });
});
