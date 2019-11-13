<template>
  <div class="home">
    <el-button type="text" @click="dialogFormVisible = true">添加</el-button>
    <el-dialog title="添加banner图" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.xu" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.bei" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input v-model="form.lian" autocomplete="off"></el-input>
        </el-form-item>
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="click_que">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="序号"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="备注"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.bei }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="类型"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.lei }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="排序"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.xu }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="时间"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.time }}</span>
      </template>
    </el-table-column>
    
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[2, 5, 8, 10]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";
export default {
  name: 'home',
  data(){
    return {
      tableData: [],
        
        currentPage4: 4,
        total:10,
        dialogFormVisible: false,
        form: {
          xu: '',
          bei: '',
          lian: '',
          time: '',
          
        },
        formLabelWidth: '120px',
         value1: ''
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
    this.axioslist()
  },
  methods: {
      //编辑
      handleEdit(index, row) {
        axios.post("/api")
        console.log(index, row);
      },
      // 删除
      handleDelete(index, row) {
        console.log(row.id)
        axios.post("/api/delete",{id:row.id}).then(res=>{
          console.log(res.data);

        })
         this.axioslist()
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      click_que(){
        const {value1,form}=this
        const {bei,lian,xu}=form
        let aaa=new Date()
        let time=this.fntime(aaa),timestart=this.fntime(value1[0]),timeend=this.fntime(value1[1])
        
        console.log(bei,lian,xu,timestart,timeend,time)
        axios.post("/api/add",{bei,lian,xu,time,timestart,timeend}).then(res=>{
          console.log(res.data)
        })
        this.dialogFormVisible = false
        this.axioslist()
      },
      fntime(v){
        return v.getFullYear()+"-"+v.getMonth()+"-"+v.getDate()+" "+v.getHours()+":"+v.getMinutes()+":"+v.getSeconds()
      },
      axioslist(){
        axios.post("/api/select").then(res=>{
          if(res.data.code===1){
            console.log(res.data.num)
            this.total=res.data.num
            this.tableData=res.data.aaa

          }
        })
    
      }
    }
}
</script>
