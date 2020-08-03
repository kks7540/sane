package sane.co.kr.core;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.dao.DataAccessException;

/**
* <pre>
* com.inditaxi.kodt.core.mvc
*	- ParentMapper.java
* </pre>
*
* @ClassName	: ParentMapper
* @Description	: DAO 클래스 상속용 ParentMapper 클래스
* @author 		: kks
* @date 		: 2018. 01. 11.
* @Version 		: 1.0
*
*/
public class ParentMapper extends SqlSessionDaoSupport{

	/**
	* @Title		: setSqlSessionFactory
	* @Description	: SqlSessionFactory객체를 셋팅한다.
	* @param sqlSession SqlSessionFactory객체
	* @return void
	*/
	@Resource(name = "sqlSession")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession){
		super.setSqlSessionFactory(sqlSession);
	}

	/**
	* @Title		: insert
	* @Description	: 쿼리ID에 해당하는 쿼리의 insert수행
	* @param queryId 쿼리ID
	* @return int insert로우수
	*/
	public int insert(String queryId){
		return getSqlSession().insert(queryId);
	}

	/**
	* @Title		: insert
	* @Description	: 쿼리ID에 해당하는 쿼리와 파라미터오브젝트객체를 사용하여 insert수행
	* @param queryId 쿼리ID
	* @param parameterObject 파라미터오브젝트객체
	* @return int insert로우수
	*/
	public int insert(String queryId, Object parameterObject){
		return getSqlSession().insert(queryId, parameterObject);
	}

	/**
	* @Title		: update
	* @Description	: 쿼리ID에 해당하는 쿼리의 update수행
	* @param queryId 쿼리ID
	* @return int update로우수
	*/
	public int update(String queryId){
		return getSqlSession().update(queryId);
	}

	/**
	* @Title		: update
	* @Description	: 쿼리ID에 해당하는 쿼리와 파라미터오브젝트객체를 사용하여 update수행
	* @param queryId 쿼리ID
	* @param parameterObject 파라미터오브젝트객체
	* @return int update로우수
	*/
	public int update(String queryId, Object parameterObject){
		return getSqlSession().update(queryId, parameterObject);
	}

	/**
	* @Title		: delete
	* @Description	: 쿼리ID에 해당하는 쿼리의 delete수행
	* @param queryId 쿼리ID
	* @return int delete로우수
	*/
	public int delete(String queryId){
		return getSqlSession().delete(queryId);
	}

	/**
	* @Title		: delete
	* @Description	: 쿼리ID에 해당하는 쿼리와 파라미터오브젝트객체를 사용하여 delete수행
	* @param queryId 쿼리ID
	* @param parameterObject 파라미터오브젝트객체
	* @return int delete로우수
	*/
	public int delete(String queryId, Object parameterObject){
		return getSqlSession().delete(queryId, parameterObject);
	}

	/**
	* @Title		: queryForObject
	* @Description	: 쿼리ID에 해당하는 쿼리와 파라미터오브젝트객체를 사용하여 select수행
	* @param queryId 쿼리ID
	* @param parameterObject 파라미터오브젝트객체
	* @throws DataAccessException
	* @return Object 로우데이터
	*/
	public Object queryForObject(String queryId, Object parameterObject) throws DataAccessException{
        return selectOne(queryId, parameterObject);
    }

	/**
	* @Title		: queryForObject
	* @Description	: 쿼리ID에 해당하는 쿼리의 select수행
	* @param queryId 쿼리ID
	* @throws DataAccessException
	* @return Object 로우데이터
	*/
	public Object queryForObject(String queryId) throws DataAccessException{
        return selectOne(queryId);
    }

    /**
    * @Title		: queryForMap
    * @Description	: 쿼리ID에 해당하는 쿼리와 파라미터오브젝트객체를 사용하여 select수행
    * @param queryId
    * @param parameterObject 파라미터오브젝트객체
    * @throws DataAccessException
    * @return Map 로우데이터맵
    */
    @SuppressWarnings({ "rawtypes" })
	public Map queryForMap(String queryId, Object parameterObject) throws DataAccessException{
    	HashMap map = (HashMap) selectOne(queryId, parameterObject);
	    return map;
    }

    /**
    * @Title		: queryForMap
    * @Description	: 쿼리ID에 해당하는 쿼리의 select수행
    * @param queryId 쿼리ID
    * @throws DataAccessException
    * @return Map 로우데이터맵
    */
    @SuppressWarnings({ "rawtypes" })
	public Map queryForMap(String queryId) throws DataAccessException{
    	HashMap map = (HashMap) selectOne(queryId);
	    return map;
    }

    /**
    * @Title		: queryForList
    * @Description	: 쿼리ID에 해당하는 쿼리와 파라미터오브젝트객체를 사용하여 select수행
    * @param queryId 쿼리ID
    * @param parameterObject 파라미터오브젝트객체
    * @throws DataAccessException
    * @return List 데이터목록객체
    */
    @SuppressWarnings({ "rawtypes" })
	public List queryForList(String queryId, Object parameterObject) throws DataAccessException{
    	return selectList(queryId, parameterObject);
    }

    /**
    * @Title		: queryForList
    * @Description	: 쿼리ID에 해당하는 쿼리의 select수행
    * @param queryId 쿼리ID
    * @throws DataAccessException
    * @return List 데이터목록객체
    */
    @SuppressWarnings({ "rawtypes" })
	public List queryForList(String queryId) throws DataAccessException{
    	return selectList(queryId);
    }

    /**
    * @Title		: queryForList
    * @Description	: 쿼리ID에 해당하는 쿼리와 파라미터오브젝트객체를 사용하여 스킵인덱스와 스킵사이즈를 이용하여 select수행
    * @param queryId 쿼리 ID
    * @param parameterObject 파라미터오브젝트객체
    * @param skip 스킵인덱스
    * @param max 스킵사이즈
    * @throws DataAccessException
    * @return List 데이터목록객체
    */
    @SuppressWarnings({ "rawtypes" })
	public List queryForList(String queryId, Object parameterObject, int skip, int max) throws DataAccessException{
    	return listWithPaging(queryId, parameterObject, skip, max);
    }

    /**
    * @Title		: selectOne
    * @Description	: 쿼리ID에 해당하는 쿼리의 select수행
    * @param queryId 쿼리ID
    * @return T 로우데이터 객체
    */
    private <T> T selectOne(String queryId){
		return (T) getSqlSession().selectOne(queryId);
	}

    /**
    * @Title		: selectOne
    * @Description	: 쿼리ID에 해당하는 쿼리와 파라미터오브젝트객체를 사용하여 select수행
    * @param queryId 쿼리ID
    * @param parameterObject 파라미터오브젝트객체
    * @return T 로우데이터 객체
    */
    private <T> T selectOne(String queryId, Object parameterObject){
		return (T) getSqlSession().selectOne(queryId, parameterObject);
	}

	/**
	* @Title		: selectList
	* @Description	: TODO
	* @param queryId 쿼리ID
	* @return List<E> 데이터목록 객체
	*/
	private <E> List<E> selectList(String queryId){
		return getSqlSession().selectList(queryId);
	}

	/**
	* @Title		: selectList
	* @Description	: 쿼리ID에 해당하는 쿼리와 파라미터오브젝트객체를 사용하여 select수행
	* @param queryId 쿼리ID
	* @param parameterObject 파라미터오브젝트객체
	* @return List<E> 데이터목록 객체
	*/
	private <E> List<E> selectList(String queryId, Object parameterObject){
		return getSqlSession().selectList(queryId, parameterObject);
	}

	/**
	* @Title		: listWithPaging
	* @Description	: 쿼리ID에 해당하는 쿼리와 파라미터오브젝트객체를 사용하여 스킵인덱스와 스킵사이즈를 이용하여 select수행
	* @param queryId 쿼리ID
	* @param parameterObject 파라미터오브젝트객체
	* @param pageIndex 페이지인덱스
	* @param pageSize 페이지사이즈
	* @return List<?> List 데이터목록객체
	*/
	private List<?> listWithPaging(String queryId, Object parameterObject, int pageIndex, int pageSize){
		int skipResults = pageIndex * pageSize;
		RowBounds rowBounds = new RowBounds(skipResults, pageSize);
		return getSqlSession().selectList(queryId, parameterObject, rowBounds);
	}
}