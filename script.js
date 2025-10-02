document.addEventListener("DOMContentLoaded", () => {
  const slots = document.querySelectorAll(".stamp-slot");

  // スタンプ押印判定
  let complete = true;
  for (let i = 1; i <= 5; i++) {
    const stamp = document.getElementById(`stamp${i}`);
    if (stamp) {
      if (localStorage.getItem(`stamp${i}`) === "get") {
        stamp.src = `images/stamps/stamp${i}_got.png`;
      } else {
        complete = false;
      }
    }
  }
  if (complete) {
    document.getElementById("complete-message").style.display = "block";
  }

  // ドラッグ配置機能
  slots.forEach(slot => {
    slot.onmousedown = function(e) {
      let shiftX = e.clientX - slot.getBoundingClientRect().left;
      let shiftY = e.clientY - slot.getBoundingClientRect().top;

      slot.style.zIndex = 1000;

      moveAt(e.pageX, e.pageY);

      function moveAt(pageX, pageY) {
        const boardRect = document.querySelector(".stamp-board").getBoundingClientRect();
        let left = pageX - shiftX - boardRect.left;
        let top = pageY - shiftY - boardRect.top;

        // ボード内に制限
        left = Math.max(0, Math.min(left, boardRect.width - slot.offsetWidth));
        top = Math.max(0, Math.min(top, boardRect.height - slot.offsetHeight));

        slot.style.left = left + 'px';
        slot.style.top = top + 'px';
      }

      function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      slot.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        slot.onmouseup = null;

        // 配置位置を保存
        localStorage.setItem(slot.id + "_left", slot.style.left);
        localStorage.setItem(slot.id + "_top", slot.style.top);
      };
    };

    slot.ondragstart = function() { return false; };

    // 保存済み位置を復元
    const savedLeft = localStorage.getItem(slot.id + "_left");
    const savedTop = localStorage.getItem(slot.id + "_top");
    if (savedLeft && savedTop) {
      slot.style.left = savedLeft;
      slot.style.top = savedTop;
    } else {
      // 初期配置（適当に並べる）
      const index = parseInt(slot.id.replace('slot',''));
      slot.style.left = (index - 1) * 140 + 'px';
      slot.style.top = '20px';
    }
  });
});
