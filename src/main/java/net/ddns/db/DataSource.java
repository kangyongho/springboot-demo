package net.ddns.db;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Repository;

/**
 * Created by NPOST on 2016-12-29.
 */
@Repository
public class DataSource {
    private BasicDataSource basicDataSource;

    @Value("${dev.user:undefined}")
    private String devUser;
    @Value("${dev.pw:undefined}")
    private String devPw;
    @Value("${prod.user:undefined}")
    private String prodUser;
    @Value("${prod.pw:undefined}")
    private String prodPw;

    @Bean
    public BasicDataSource getBasicDataSource() {
        if (devUser.equals("undefined")) {
            // production server
            System.out.println("production server");
            basicDataSource = new BasicDataSource();
            basicDataSource.setDriverClassName("com.mysql.jdbc.Driver");
            basicDataSource.setUrl("jdbc:mysql://localhost/testdb");
            basicDataSource.setUsername(prodUser);
            basicDataSource.setPassword(prodPw);
            return basicDataSource;
        } else {
            // develop server
            System.out.println("develop server");
            basicDataSource = new BasicDataSource();
            basicDataSource.setDriverClassName("com.mysql.jdbc.Driver");
            basicDataSource.setUrl("jdbc:mysql://localhost/testdb");
            basicDataSource.setUsername(devUser);
            basicDataSource.setPassword(devPw);
            return basicDataSource;
        }
    }
}
