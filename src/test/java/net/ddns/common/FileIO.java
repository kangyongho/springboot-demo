package net.ddns.common;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;

import java.io.*;
import java.net.URL;
import java.util.Date;

/**
 * Created by NPOST on 2016-11-27.
 * 파일 읽기 쓰기. 파일 업로드 다운로드에 쓴다.
 */
public class FileIO {
    public static void main(String[] args) throws IOException {
        String filepath = "C:\\GitHub\\springboot-demo\\src\\test\\java\\net\\ddns\\common\\temp.txt";
        //readFileByLine(filepath);
        readFileText();
    }

    // 파일을 행 단위로 읽어 오는 방법
    public static void readFileByLine(String filepath) throws IOException {
        BufferedReader br = new BufferedReader(new FileReader((filepath)));
        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            System.out.println(line);
        }
        br.close();
    }

    // ClassPathResource로 파일 경로 구해서 읽어오기
    public static void readFileText() {
        ClassPathResource classPathResource = new ClassPathResource("/static/file/temp.txt");
        try {
            BufferedReader br = new BufferedReader(new FileReader(classPathResource.getFile()));
            while (true) {
                String line = br.readLine();
                if (line == null) {
                    break;
                }
                System.out.println(line);
            }
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
