// Deterrents only: cannot fully prevent saving images in the browser.

function isProtectedTarget(target) {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest("img, .card, [data-lightbox='image']"));
}

document.addEventListener(
  "contextmenu",
  (e) => {
    if (isProtectedTarget(e.target)) e.preventDefault();
  },
  { capture: true }
);

document.addEventListener(
  "dragstart",
  (e) => {
    if (isProtectedTarget(e.target)) e.preventDefault();
  },
  { capture: true }
);

// Disable draggable attribute on all images (and on dynamically added ones too).
function disableImageDragging(root = document) {
  root.querySelectorAll("img").forEach((img) => {
    img.setAttribute("draggable", "false");
  });
}

disableImageDragging();

const mo = new MutationObserver((mutations) => {
  for (const m of mutations) {
    for (const node of m.addedNodes) {
      if (node instanceof Element) disableImageDragging(node);
    }
  }
});
mo.observe(document.documentElement, { subtree: true, childList: true });

