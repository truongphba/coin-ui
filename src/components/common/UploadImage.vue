<template>
  <q-uploader
    flat
    bordered
    auto-upload
    multiple
    batch
    :factory="uploadFile"
    accept=".jpg, image/*"
    style="width:100%;"
  >
    <template v-slot:header="scope">
      <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
        <q-spinner v-if="scope.isUploading" class="q-uploader__spinner"/>
        <div class="col">
          <div class="q-uploader__title">{{ label }}</div>
          <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }}</div>
        </div>
        <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
          <q-uploader-add-trigger/>
          <q-tooltip>Chọn ảnh</q-tooltip>
        </q-btn>
      </div>
    </template>
    <template v-slot:list>
      <div class="row items-start q-col-gutter-sm" v-if="isMultiple">
        <div class="col-6 col-sm-3"
             v-for="(item,index) in initialImagesUrl"
             :key="index">
          <q-img
            :src="getImageUrl(imageShowSize, item)"
            width="100%"
            :ratio="1"
            class="rounded-borders">
            <div class="absolute" style="border-radius: 50%;top: 2px; right: 2px">
              <q-btn flat
                     round
                     icon="clear"
                     size="10px"
                     @click="removeFile(index)"/>
            </div>
            <!--            <q-icon class="absolute all-pointer-events"-->
            <!--                    size="25px"-->
            <!--                    name="clear"-->
            <!--                    color="white"-->
            <!--                    style="top: 2px; right: 2px">-->
            <!--            </q-icon>-->
          </q-img>
        </div>
      </div>
      <div v-else>
        <div class="row justify-center">
          <q-img class="rounded-borders"
                 width="150px"
                 :src="getImageUrl(imageShowSize, initialImagesUrl)"
                 :ratio="1"/>
        </div>
      </div>
    </template>
  </q-uploader>
</template>

<script>
import imageMixin from '../mixins/image'

export default {
  name: 'Form',
  mixins: [imageMixin],
  props: {
    imagesUrl: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    patch: {
      type: String,
      default: ''
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    imageShowSize: {
      type: String,
      default: 'small'
    }
  },
  data () {
    return {
      initialImagesUrl: [],
      filePatch: []
    }
  },
  created () {
    if (this.isMultiple) {
      this.initialImagesUrl = this.imagesUrl ? this.imagesUrl.split(';') : []
    } else {
      this.initialImagesUrl = this.imagesUrl
    }
  },
  watch: {
    initialImagesUrl (val) {
      if (this.isMultiple) {
        this.$emit('fileUploaded', val.join(';'))
      } else {
        this.$emit('fileUploaded', val)
      }
    }
  },
  methods: {
    removeFile (index) {
      this.initialImagesUrl.splice(index, 1)
    },
    uploadFile (files) {
      this.filePatch = files
      const fileData = new FormData()

      for (let x = 0; x < this.filePatch.length; x++) {
        fileData.append('images[]', this.filePatch[x])
      }

      this.$axios.post(`${process.env.API_URL}/uploads/${this.patch}`, fileData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        if (this.isMultiple) {
          this.initialImagesUrl = [
            ...this.initialImagesUrl,
            ...response.data
          ]
        } else {
          this.initialImagesUrl = response.data[0]
        }
      })
    }
  }
}
</script>

<style scoped>
.q-img__content > div {
  padding: 0 !important;
}
</style>
