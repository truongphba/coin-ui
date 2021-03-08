<template>
  <div class="q-pa-md">
    <q-form ref="myForm"
            class="row q-col-gutter-x-sm">
      <div v-for="(formInput, key) in infoFormInputs"
           :key="key"
           class="col-12"
           :class="{'col-sm-4' : formInput.type === 'number', 'q-mb-md': !formInput.rules}">
        <q-input
          :ref="key"
          :type="formInput.type || 'text'"
          outlined
          :label="formInput.label"
          :rules="formInput.rules || []"
          v-model="initialProduct[key]"
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
        <upload-image label="Ảnh sản phẩm"
                      patch="products"
                      :images-url="initialProduct.images"
                      @removeFile="handleRemoveFile"
                      @fileUploaded="handleFileUploaded"/>
      </div>

      <q-select
        class="col-12"
        outlined
        :rules="[val => !!val && val.length > 0 || 'Vui lòng chọn danh mục cho sản phẩm']"
        v-model="initialProduct.category_ids"
        :options="allCategories"
        label="Danh mục"
        option-value="id"
        option-label="name"
        emit-value
        map-options
        multiple
        use-chips
      />

      <q-toggle
        v-if="isEdit"
        class="col-12"
        size="xl"
        v-model="initialProduct.status"
        :true-value="1"
        :false-value="0"
        :label="labelToggle"
      />
    </q-form>
    <q-card-actions align="right"
                    class="bg-white text-teal">
      <q-btn flat
             label="Lưu"
             type="submit"
             @click="onSubmit"/>
      <q-btn flat
             label="Đóng"
             v-close-popup/>
    </q-card-actions>
  </div>
</template>

<script>
import UploadImage from 'components/common/UploadImage'

export default {
  name: 'Form',
  components: {
    UploadImage
  },
  props: {
    product: {
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
    allCategories: {
      type: Array,
      default: () => []
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
      infoFormInputs: {
        name: {
          label: 'Tên',
          rules: [val => !!val || 'Vui lòng nhập tên sản phẩm']
        },
        description: {
          label: 'Mô tả',
          rules: [val => !!val || 'Vui lòng nhập giá sản phẩm'],
          type: 'textarea'
        },
        price: {
          label: 'Giá',
          rules: [val => !!val || 'Vui lòng nhập giá sản phẩm'],
          type: 'number'
        },
        discount: {
          label: 'Giảm giá',
          type: 'number'
        },
        quantity: {
          label: 'Số lượng',
          rules: [val => !!val || 'Vui lòng nhập số lượng sản phẩm'],
          type: 'number'
        }
      },
      initialProduct: {},
      category_ids: []
    }
  },
  created () {
    if (this.isEdit) {
      this.initialProduct = {
        ...this.product
      }
    }
  },
  computed: {
    labelToggle () {
      return this.initialProduct.status === 1 ? 'Hoạt động' : 'Tạm ngừng'
    }
  },
  methods: {
    onSubmit () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$emit('save', {
            data: this.initialProduct,
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
        message: this.initialProduct.id ? `Cập nhật ${title}` : `Thêm mới ${title}`
      })
      this.$emit('close')
    },
    handleFileUploaded (data) {
      this.initialProduct.images = data
    },
    handleRemoveFile (data) {
      this.initialProduct.images = data.join(';')
    }
  }
}
</script>
