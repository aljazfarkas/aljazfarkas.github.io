---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Home
---

<div class="centered">
  <img src="/alexander.gif" alt="@alexander.gif" />
  <div class="down-arrow" id="downArrow">&#8595;</div>
</div>

<div class="blog-list-section" id="blogListSection">
  <div class="blog-list">
    <h2>Blog Posts</h2>
    {% for post in site.posts %}
      <div class="blog-post">
        <a href="{{ post.url }}" class="blog-post-title">{{ post.title }}</a>
        <div class="blog-post-date">{{ post.date | date: "%B %d, %Y" }}</div>
        <div class="blog-post-excerpt">{{ post.excerpt }}</div>
      </div>
    {% endfor %}
  </div>
</div>

<script>
  const downArrow = document.getElementById('downArrow');
  const blogListSection = document.getElementById('blogListSection');
  let arrowTimeout;
  
  function showArrow() {
    downArrow.classList.add('visible');
    clearTimeout(arrowTimeout);
    arrowTimeout = setTimeout(() => {
      downArrow.classList.remove('visible');
    }, 1200);
  }
  
  document.addEventListener('mousemove', showArrow);
  
  function onScrollOrLoad() {
    const rect = blogListSection.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      blogListSection.classList.add('visible');
    }
  }
  
  window.addEventListener('scroll', onScrollOrLoad);
  window.addEventListener('load', onScrollOrLoad);
  
  downArrow.addEventListener('click', function() {
    window.scrollTo({
      top: blogListSection.offsetTop,
      behavior: 'smooth'
    });
  });
  
  downArrow.classList.remove('visible');
</script>
