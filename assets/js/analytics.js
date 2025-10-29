<script>
  document.addEventListener('click', function(e){
    const a = e.target.closest('a[href*="gumroad.com"]');
    if (!a || !window.plausible) return;
    plausible('Gumroad Click', { props: { href: a.href, label: a.textContent.trim() }});
  });
</script>
