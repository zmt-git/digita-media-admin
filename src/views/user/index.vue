<template>
  <div class="user table">
    <el-table
      v-loading='loading_PT'
      :data="pageList_PT"
      border
      tooltip-effect="dark"
      style="width: 100%"
      size='mini'
      header-cell-class-name='head-style'
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="username"
        show-overflow-tooltip
        label="用户姓名">
      </el-table-column>
      <el-table-column
        prop="mobile"
        show-overflow-tooltip
        label="登录名">
      </el-table-column>
      <el-table-column
        prop="userType"
        show-overflow-tooltip
        :formatter="formatterUserType"
        label="用户类型">
      </el-table-column>
      <el-table-column
        prop="tradeType"
        :formatter="formatterTradeType"
        show-overflow-tooltip
        label="行业类型">
      </el-table-column>
      <el-table-column
        prop="city"
        show-overflow-tooltip
        :formatter="formatterCity"
        label="所在城市">
      </el-table-column>
      <el-table-column
        width="100"
        prop="storageUsed"
        :formatter="formatterStorage"
        label="已用空间(G)">
      </el-table-column>
      <el-table-column
        width="100"
        prop="storageTotal"
        :formatter="formatterStorage"
        label="空间大小(G)">
      </el-table-column>
      <el-table-column
        prop="timeCreate"
        width="140"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="timeLogin"
        width="140"
        label="最后登录时间">
      </el-table-column>
      <el-table-column label="操作"
        width="80"
        fixed="right"
      >
      <template slot-scope="scope">
        <el-button-group>
          <el-button class="el-button--micro" v-hasButton='"编辑"' size="mini" type="info" icon="el-icon-edit"></el-button>
          <el-button class="el-button--micro" @click="handleDelete(scope.row)" v-hasButton='"删除"' size="mini" type="danger" icon="el-icon-delete"></el-button>
        </el-button-group>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      @size-change="onChangeLimit"
      @current-change="onChangePage"
      :current-page="page_PT"
      :page-sizes="pageSizes_PT"
      :page-size="limit_PT"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal_PT">
    </el-pagination>
  </div>
</template>
<script>
import { listUser, /* passwordUser, saveUser, updateUser, */ deleteUser } from '@/api/user'
import pageTable from '@/mixins/pageTable'
import { tradeType } from '@/data/common'
import { province } from '@/data/province'
import { mapGetters } from 'vuex'
export default {
  name: 'user',

  mixins: [pageTable],

  computed: {
    ...mapGetters(['user'])
  },

  data () {
    return {
      visible: false,
      pageRequest_PT: listUser
    }
  },

  methods: {
    handleSelectionChange () {},

    showPopover () {
      this.visible = true
    },

    handleDelete (row) {
      this.$confirm('该操作将永久删除改用户， 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false
      }).then(async () => {
        this.visible = false
        this.loading_PT = true
        await deleteUser([row.userId])
          .then(res => {
            this.$message({ type: 'success', message: '删除成功' })
          })
          .catch(e => console.log(e))
        this.getTableData()
        this.loading_PT = false
      }).catch(() => {
        console.log('取消退出')
      })
    },

    formatterUserType (row, column, cellValue, index) {
      let userType
      switch (row.userType) {
        case 0: userType = '个人'
          break
        case 1: userType = '企业'
          break
        case 2: userType = '管理员'
          break
        default: userType = ''
      }
      return userType
    },

    formatterTradeType (row, column, cellValue, index) {
      const obj = tradeType.find(item => item.val === row.tradeType)
      if (obj) return obj.name
      return ''
    },
    formatterCity (row, column, cellValue, index) {
      return province[row.city] ? province[row.city] : ''
    },
    formatterStorage (row, column, cellValue, index) {
      return (cellValue / 1024).toFixed(2)
    }
  }
}
</script>
