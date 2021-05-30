<template>
    <div id="observer"></div>
</template>

<script>
export default {
    name: 'observer',
    data() {
        return {
            observer: null,
        }
    },
    mounted() {
        this.observer = new IntersectionObserver(([entry]) => {
            if(entry && entry.isIntersecting) {
                //console.log(entry)
                this.$emit('intersect')
            }
        })

        this.observer.observe(this.$el)
    }
}
</script>

<style>
#observer {
    height: 1px;
}
</style>