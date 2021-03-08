<template>
  <div class="q-pa-md">
    <q-form ref="myForm"
            class="row">
        <q-input
          v-for="(formInput, key) in infoFormInputs"
          :key="key"
          class="col-12"
          :class="{'col-sm-6 q-mb-md' : formInput.type === 'number'}"
          :ref="key"
          :type="formInput.type || 'text'"
          outlined
          :label="formInput.label"
          :rules="formInput.rules || []"
          v-model="initialCategory[key]"
          :error="error && key in error.data.message"
        >
          <template v-slot:error>
            <div v-for="(item, index) in error.data.message[key]" :key="index">
              {{ item }}
            </div>
          </template>
        </q-input>
      <q-select
        class="col-12"
        outlined
        v-model="initialCategory.parent_id"
        :options="initialAllParentCategories"
        label="Danh mục cha"
        option-value="id"
        option-label="name"
        emit-value
        map-options
      />
      <q-toggle
        v-if="isEdit"
        class="col-12"
        size="xl"
        v-model="initialCategory['status']"
        :true-value="1"
        :false-value="0"
        :label="labelToggle"
      />
    </q-form>
    <q-card-actions align="right"
                    class="bg-white text-teal">
      <q-btn flat
             label="Đóng"
             v-close-popup/>
      <q-btn flat
             label="Lưu"
             type="submit"
             @click="onSubmit"/>
    </q-card-actions>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    category: {
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
    allParentCategories: {
      type: Array,
      default: () => []
    },
    error: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      infoFormInputs: {
        name: {
          label: 'Tên danh mục',
          rules: [val => !!val || 'Vui lòng nhập tên danh mục']
        },
        description: {
          label: 'Mô tả danh mục',
          rules: [
            val => !!val || 'Vui lòng nhập mô tả của danh mục'
          ],
          type: 'textarea'
        }
      },
      initialCategory: {},
      initialAllParentCategories: []
    }
  },
  mounted () {
    this.initialAllParentCategories = [
      ...[{ id: 0, name: 'Không có' }],
      ...this.allParentCategories
    ]
    if (this.isEdit) {
      this.initialCategory = {
        ...this.category
      }
    }
  },
  computed: {
    labelToggle () {
      return this.initialCategory.status === 1 ? 'Hoạt động' : 'Tạm ngừng'
    }
  },
  methods: {
    onSubmit () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$emit('save', {
            data: this.initialCategory,
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
        message: this.initialCategory.id ? `Cập nhật ${title}` : `Thêm mới ${title}`
      })
      this.$emit('close')
    }
  }
}
</script>
