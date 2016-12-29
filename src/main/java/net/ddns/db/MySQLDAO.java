package net.ddns.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by NPOST on 2016-12-28.
 */
public class MySQLDAO {

    public void pagingMySQL(Connection connection) throws SQLException {
        String countSQL = "SELECT COUNT(*) FROM board";
        PreparedStatement psCountSQL = connection.prepareStatement(countSQL);
        ResultSet rsCountSet = psCountSQL.executeQuery();
        rsCountSet.next();

        /* 페이징의 핵심: 게시물(List)과 페이지(Page) 수 */
        int totalListCount = rsCountSet.getInt(1); // 총 게시물 수 (DB에서 구해온다 - 몇 만건이면 이렇게 구하면 안된다.)
        int countList = 10; // 한 페이지에 출력될 게시물 수
        int countPage = 10; // 한 화면에 출력될 페이지 수 (아래 페이징 번호)
        int page = 2; // 현재 페이지 번호 (html에서 a태그로 입력 받는다)

        int totalPage = totalListCount / countList; // 총 페이지 수
        if (totalListCount % countList > 0) totalPage++;
        if (totalPage < page) page = totalPage; // 현재 페이지가 총 페이지를 넘어가지 않도록 한다.

        int startPage = ((page - 1) / countPage) * countPage + 1; // 시작 페이지 구하는 핵심 로직 (html에 구현 하면 페이지 번호가 된다)
        int endPage = startPage + countPage -1;
        if (endPage > totalPage) endPage = totalPage;

        System.out.println("totalListCount: " + totalListCount);
        System.out.println("countList: " + countList);
        System.out.println("countPage: " + countPage);
        System.out.println("totalPage: " + totalPage);
        System.out.println("page: " + page);
        System.out.println("startPage: " + startPage);
        System.out.println("endPage: " + endPage);

        /* MySQL 쿼리 LIMIT로 페이지 번호를 이용하여 범위로 검색해 온다 */
        String selectSQL = "SELECT * FROM board LIMIT ?, ?";
        PreparedStatement psSelectSQL = connection.prepareStatement(selectSQL);
        psSelectSQL.setInt(1, (page-1)*countList);
        psSelectSQL.setInt(2, countList);
        ResultSet rsSelectSet = psSelectSQL.executeQuery();

        // 아래 부분을 html에 구현하면 게시물 리스트를 만들 수 있다.
        while (rsSelectSet.next()) {
            System.out.printf("%s %s\n", rsSelectSet.getString("id"), rsSelectSet.getString("title"));
        }

        rsCountSet.close();
        rsSelectSet.close();
    }
}
