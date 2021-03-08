<template>
  <div class="q-pa-md">
    <q-form ref="myForm" class="row q-col-gutter-x-sm">

      <q-select
          class="col-12 q-mb-lg"
          outlined
          v-model="initialBanner.code"
          :options="codes"
          label="Code*"
          emit-value
          :rules = "[val => !!val || 'Vui lòng nhập chọn code']"
      />

      <div
          v-for="(formInput, key) in infoFormInputs"
          :key="key"
          class="col-12"
          :class="{'col-sm-4' : formInput.type === 'number', 'q-mb-md': !formInput.rules}"
      >

        <q-input
            :ref="key"
            :type="formInput.type || 'text'"
            outlined
            :label="formInput.label"
            :rules="formInput.rules || []"
            v-model="initialBanner[key]"
            :error="error && key in error.data.message"
        >
          <template v-slot:error>
            <div v-for="(item, index) in error.data.message[key]" :key="index">
              {{ item }}
            </div>
          </template>
        </q-input>
      </div>

      <div class="col-12 q-mb-lg">
        <upload-image
            label="Ảnh Banner*"
            patch="banners"
            :is-multiple="isMultiple"
            :images-url="initialBanner.image"
            @removeFile="handleRemoveFile"
            @fileUploaded="handleFileUploaded"
        />
      </div>

      <q-toggle
          v-if="isEdit"
          class="col-12"
          size="xl"
          v-model="initialBanner.status"
          :true-value="1"
          :false-value="0"
          :label="labelToggle"
      />
    </q-form>
    <q-card-actions align="right" class="bg-white text-teal">
      <q-btn flat label="Lưu" type="submit" @click="onSubmit"/>
      <q-btn flat label="Đóng" v-close-popup/>
    </q-card-actions>
  </div>
</template>

<script>
import UploadImage from 'components/common/UploadImage'
import { Constants } from 'src/utils/const'

export default {
  name: 'Form',
  components: {
    UploadImage
  },
  props: {
    banner: {
      type: Object,
      default: () => {
      }
    },
    isSaved: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    error: {
      type: Object,
      default: () => {
      }
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isMultiple: false,
      infoFormInputs: {
        title: {
          label: 'Ghi chú*',
          rules: [val => !!val || 'Vui lòng nhập ghi chú']
        },
        url_go_to: { label: 'Url' },
        url_title: { label: 'Tiêu đề Url' },
        text1: { label: 'Tiêu đề 1' },
        text2: { label: 'Tiêu đề 2' },
        text3: { label: 'Tiêu đề 3' }
      },
      initialBanner: {},
      codes: Constants.BannerCodes
    }
  },
  created () {
    if (this.isEdit) {
      this.initialBanner = {
        ...this.banner
      }
    }
  },
  computed: {
    labelToggle () {
      return this.initialBanner.status === 1 ? 'Hoạt động' : 'Tạm ngừng'
    }
  },
  methods: {
    onSubmit () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$emit('save', {
            data: this.initialBanner,
            done: () => {
              if (!this.error || this.error.status !== 422) {
                this.handleSubmit()
              }
            }
          })
        }
      })
    },
    handleSubmit () {
      const title = this.error ? 'thất bại' : 'thành công'
      this.$q.notify({
        color: this.error ? 'red' : 'green-4',
        message: this.initialBanner.id ? `Cập nhật ${title}` : `Thêm mới ${title}`
      })
      this.$emit('close')
    },
    handleFileUploaded (data) {
      this.initialBanner.image = data
    },
    handleRemoveFile (data) {
      this.initialBanner.image = data.join(';')
    }
  }
}
</script>
