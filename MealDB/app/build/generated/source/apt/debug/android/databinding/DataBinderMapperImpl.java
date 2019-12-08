package android.databinding;

public class DataBinderMapperImpl extends MergedDataBinderMapper {
  DataBinderMapperImpl() {
    addMapper(new com.droidman.mvvm_mealdb.DataBinderMapperImpl());
  }
}
