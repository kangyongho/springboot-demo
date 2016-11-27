package net.ddns;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * Created by NPOST on 2016-11-24.
 */

@Controller
public class HelloController {

    @RequestMapping("hello")
    public String index(Locale locale, Model model) {
        Date date = new Date();
        DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
        String formatteDate = dateFormat.format(date);

        model.addAttribute("servertime", formatteDate);
        model.addAttribute("name", "Spring from daniel");

        return "hello";
    }

    @RequestMapping("/")
    public String mainPage() {
        return "main_page";
    }

    @RequestMapping("demo")
    public String demo(Locale locale, Model model) {
        Date date = new Date();
        DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
        String formatteDate = dateFormat.format(date);

        model.addAttribute("servertime", formatteDate);
        model.addAttribute("name", "Spring from daniel");

        return "demo/hello-demo";
    }

    @RequestMapping("spring")
    public String spring() {

        return "spring/spring_main";
    }
}
