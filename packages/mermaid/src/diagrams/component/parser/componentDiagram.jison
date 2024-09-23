/* componentDiagram */
%lex
%x acc_title
%x acc_descr
%x acc_descr_multiline
%x component

%%
accTitle\s*":"\s*                               { this.begin("acc_title");return 'acc_title'; }
<acc_title>(?!\n|;|#)*[^\n]*                    { this.popState(); return "acc_title_value"; }
accDescr\s*":"\s*                               { this.begin("acc_descr");return 'acc_descr'; }
<acc_descr>(?!\n|;|#)*[^\n]*                    { this.popState(); return "acc_descr_value"; }
accDescr\s*"{"\s*                               { this.begin("acc_descr_multiline");}
<acc_descr_multiline>[\}]                       { this.popState(); }
<acc_descr_multiline>[^\}]*                     return "acc_descr_multiline_value";
// <acc_descr_multiline>.*[^\n]*                {  return "acc_descr_line"}

\s*(\r?\n)+                                     return 'NEWLINE';
\s+                                             {/* skip whitespace */}

"componentDiagram"                              return 'COMPONENT_DIAGRAM';

"component"                                     { this.begin('component'); return 'COMPONENT'; }
<component>\s*(\r?\n)+                          { this.popState(); return 'NEWLINE'; }
<component>\s+                                  {/* skip whitespace */}
<component>[a-zA-Z_][a-zA-Z0-9_]*               return 'ID';
<component>"["                                  return '[';
<component>"]"                                  return ']';

<*><<EOF>>                                      return 'EOF';

/lex

%start start

%%

start
    : mermaidDoc
    ;

mermaidDoc
    : graphConfig
    ;

graphConfig
    : COMPONENT_DIAGRAM NEWLINE statements EOF
    | COMPONENT_DIAGRAM NEWLINE EOF
    ;


statements
    : statement
    | statement NEWLINE
    | statement NEWLINE statements
    ;

statement
    : acc_title acc_title_value  { $$=$2.trim();yy.setAccTitle($$); }
    | acc_descr acc_descr_value  { $$=$2.trim();yy.setAccDescription($$); }
    | acc_descr_multiline_value  { $$=$1.trim();yy.setAccDescription($$); }
    | componentDefinition
    ;

/* Component Definitions */
componentDefinition
    : COMPONENT ID { yy.addComponent($2, $2); }
    | COMPONENT ID '[' ID ']' { yy.addComponent($2, $4); }
    ;
