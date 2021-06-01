<template>
  <el-dialog
    title="提示"
    :visible="visible"
    @close='cancel'
    width="30%">
    <span>
      <el-checkbox v-model="checked">该媒体将从所有智能终端中清除！</el-checkbox>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="cancel">取 消</el-button>
      <el-button size="mini" type="primary" @click="deleteConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'media-delete-dialog',

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      checked: false
    }
  },

  methods: {
    cancel () {
      this.checked = false
      this.$emit('update:visible', false)
    },

    deleteConfirm () {
      this.$emit('confirm', this.checked)
    }
  }
}
</script>
