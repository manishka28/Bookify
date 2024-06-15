
#include <iostream>
#include <stack>
#include <string>
using namespace std;

class Solution {
public:
    string clearDigits(string s) {
        string temp=s;
        int l=s.length();
        stack<int>st;
        for(int i=0;i<l;i++){
            if(temp[i]>=48 && temp[i]<=57){
                s.erase(s.begin()+i);
                int idx=st.top();
                st.pop();
                s.erase(s.begin()+idx); 
            }
            else{
                st.push(i);
            }
        }
        return s;
    }
};
int main(){
  Solution solution;
    std::string result = solution.clearDigits("a1b2c3");
    std::cout << result << std::endl; // Output should be "bc"
    return 0;
}