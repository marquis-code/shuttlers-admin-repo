<template>
	<div>
		<div class="image-wrapper"
			:class="styleClass"
			title="Click to expand"
			@click.stop.prevent="openZoom()">
			<slot name="image" />
		</div>
		<div id="zoomModal" class="image-zoom">
			<div class="backdrop" title="Click to close" @click.stop.prevent="closeZoom" />
			<img id="modalImage" alt="" class="zoom-content" @click="preventPropagation">
		</div>
	</div>
</template>

<script lang="ts" script>
const imgEl = ref(null)
const modalImg = ref(null)
const modalElement = ref(null)

onMounted(() => {
  init()
})

    const init = () => {
      imgEl.value = this.$el.querySelector('img')
      modalImg.value = this.$el.querySelector('#modalImage')
      modalElement.value = this.$el.querySelector('#zoomModal')
    }

    const openZoom = () => {
      if (this.imgEl) {
        modalElement.style.display = 'block'
        modalImg.src = this.imgEl.src
        modalImg.alt = this.imgEl.alt
      }
    }

    const closeZoom = () => {
      this.modalImg.className += ' zoom-content--out'
      setTimeout(() => {
        this.modalElement.style.display = 'none'
        this.modalImg.className = 'zoom-content'
      }, 400)
    }

    const preventPropagation = (event) => {
      event.stopPropagation()
    }

export default {
  name: 'ImageZoom',
  props: {
    styleClass: {
      type: String,
      default: ''
    }
  },
  mounted () {

  }

}
</script>

<!-- <script>
export default {
  name: 'ImageZoom',
  props: {
    styleClass: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.init()
  },
  data () {
    return {
      imgEl: null,
      modalImg: null,
      modalElement: null
    }
  },
  methods: {
    init () {
      this.imgEl = this.$el.querySelector('img')
      this.modalImg = this.$el.querySelector('#modalImage')
      this.modalElement = this.$el.querySelector('#zoomModal')
    },
    openZoom () {
      if (this.imgEl) {
        this.modalElement.style.display = 'block'
        this.modalImg.src = this.imgEl.src
        this.modalImg.alt = this.imgEl.alt
      }
    },
    closeZoom () {
      this.modalImg.className += ' zoom-content--out'
      setTimeout(() => {
        this.modalElement.style.display = 'none'
        this.modalImg.className = 'zoom-content'
      }, 400)
    },
    preventPropagation (event) {
      event.stopPropagation()
    }
  }
}
</script> -->

<style lang="scss" scoped>

@-webkit-keyframes zoom {
  from {-webkit-transform:scale(1)}
  to {-webkit-transform:scale(2)}
}
@keyframes zoom {
  from {transform:scale(0.4)}
  to {transform:scale(1)}
}
@-webkit-keyframes zoom-out {
  from {transform:scale(1)}
  to {transform:scale(0)}
}
@keyframes zoom-out {
  from {transform:scale(1)}
  to {transform:scale(0)}
}

.image-zoom {
  display: none;
  position: fixed;
  z-index: 1030;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.7);

  .backdrop {
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .zoom-content {
    margin: auto;
    display: block;
    animation-name: zoom;
    animation-duration: 0.6s;
    max-width: 75%;
    max-height: calc(100vh - 200px);
    z-index: 2;
    position: relative;
    cursor: default;
    @media only screen and (max-width: 700px){
      max-width: 95%;
    }

    &--out {
      animation-name: zoom-out;
      animation-duration: 0.6s;
    }
  }

}
.image-wrapper {
  cursor: pointer;
  transition: 0.3s;
  display: block;
  &:hover {
    cursor: zoom-in;
    opacity: 0.7;
  }
}
</style>
