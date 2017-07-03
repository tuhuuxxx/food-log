<script>
export default {
  name: 'runitem',

  functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('div', { attrs: { class: 'value' } }, [item.value]),
        h('span', { attrs: { class: 'link' } }, [item.link])
      ]);
    },
    props: {
      item: { type: Object, required: true }
    }
}
</script>