import java.awt.*;
import javax.swing.JFrame;
import uk.ac.leedsbeckett.oop.LBUGraphics;
import java.io.IOException;
import java.io.*;
import static java.awt.Color.*;
import java.awt.image.BufferedImage;

public class TurtleGraphics extends LBUGraphics {
    String commandList="";

    public static void main(String[] args) {
        new TurtleGraphics();
    }

    public TurtleGraphics() {
        JFrame MainFrame = new JFrame("Turtle Graphics");
        MainFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        MainFrame.setLayout(new FlowLayout());
        MainFrame.add(this);
        MainFrame.pack();
        MainFrame.setVisible(true);
        //about();
    }
    public void processCommand (String command){
        parseCommand(command);
         commandList = command +"\n";

    }
    public void parseCommand(String command) {
        String[] parts = command.trim().split(" ");
        String action = parts[0].toLowerCase();

        try {
            switch (action) {
                case "about":
                    about();
                    break;
                case "penup":
                    drawOff();
                    break;
                case "pendown":

                    drawOn();
                    break;
                case "left":
                    if (parts.length > 1) left(Integer.parseInt(parts[1]));
                    else displayMessage("Error: Missing parameter for left");
                    break;
                case "right":
                    if (parts.length > 1) right(Integer.parseInt(parts[1]));
                    else displayMessage("Error: Missing parameter for right");
                    break;
                case "move":
                    if (parts.length > 1)forward(Integer.parseInt(parts[1]));
                    else displayMessage("Error: Missing parameter for move");
                    break;
                case "reverse":
                    String num;
                    if (parts.length > 1) {
                        num = "-" + parts[1];
                        forward(num);
                    }
                    else displayMessage("Error: Missing parameter for reverse");
                    break;
                case "black":
                    setPenColour(black);
                    break;
                case "red":
                    setPenColour(red);
                    break;
                case "green":
                    setPenColour(green);
                    break;
                case "white":
                    setPenColour(white);
                    break;
                case "reset":
                    reset();
                    break;
                case "clear":
                    clear();
                    break;
                case "dance":
                    dance(5);
                    break;
                case "message":
                    displayMessage("Hello Michael");
                    break;
                case "circle":
                    if (parts.length == 2) circle(Integer.parseInt(parts[1]));
                    else displayMessage("Error: Circle command requires radius.");
                    break;
                case "square":
                    if (parts.length > 1) drawSquare(Integer.parseInt(parts[1]));
                    else displayMessage("Error: Missing parameter for square");
                    break;
                case "triangle":
                    if (parts.length == 2) drawEquilateralTriangle(Integer.parseInt(parts[1]));
                    else if (parts.length == 4)
                        drawTriangle(Integer.parseInt(parts[1]), Integer.parseInt(parts[2]), Integer.parseInt(parts[3]));
                    else displayMessage("Error: Incorrect parameters for triangle");
                    break;
                case "pencolour":
                    if (parts.length == 4) setPenColour(green);
                    else displayMessage("Error: Incorrect parameters for pencolour");
                    break;
                case "penwidth":
                    if (parts.length > 1) getStroke();
                    else displayMessage("Error: Missing parameter for penwidth");
                    break;
                case "save":
                    FileWriter file = new FileWriter("input.txt");
                    BufferedWriter br = new BufferedWriter(file);
                    br.write(commandList);
                    br.close();
                    break;
                case "load":
                    File file1 = new File("input.txt");
                    FileReader fileReader = null;
                    fileReader = new FileReader(file1);
                    BufferedReader output = new BufferedReader(fileReader);
                    String line;
                    while ((line = output.readLine())!=null){
                        parseCommand(line);
                    }
                    break;
                default:
                    displayMessage("Error: Unknown command");
                    break;
            }
        } catch (NumberFormatException e) {
            displayMessage("Error: Invalid number format");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void drawSquare(int size) {
        for (int i = 0; i < 4; i++) {
            forward(size);
            right(90);
        }
    }

    private void drawEquilateralTriangle(int size) {
        for (int i = 0; i < 3; i++) {
            forward(size);
            right(120);
        }
    }

    private void drawTriangle(int side1, int side2, int side3) {
        forward(side1);
        right(120);
        forward(side2);
        right(120);
        forward(side3);
    }
}
