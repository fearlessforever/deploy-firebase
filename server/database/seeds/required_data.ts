import { Password } from "@server/utils/hash";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    const checkExist = await knex('users').where('id' , 0 ).first()

    if( !checkExist ){
        
        await knex("users").insert([
            {  id:0 , first_name: "HeLizCooLZ" ,last_name:'' , username:'HeL', email:'hel@admin.com' , password: Password.hashPassword('1') },
        ]);
        await knex("items").insert([
            { title:'Daftar Anime' , content:'List Anime yang ter sekarang' },
            { title:'Lorem Ipsum' , content:'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.' },
            { title:'Lorem Ipsum 2' , content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique. Velit dignissim sodales ut eu sem. Dui vivamus arcu felis bibendum. Aenean et tortor at risus viverra adipiscing at.' },
            { title:'Lorem Ipsum 3' , content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. In eu mi bibendum neque egestas congue quisque. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Quam viverra orci sagittis eu volutpat.' },
            { title:'Lorem Ipsum' , content:'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.' },
            { title:'Lorem Ipsum 2' , content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique. Velit dignissim sodales ut eu sem. Dui vivamus arcu felis bibendum. Aenean et tortor at risus viverra adipiscing at.' },
            { title:'Lorem Ipsum 3' , content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. In eu mi bibendum neque egestas congue quisque. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Quam viverra orci sagittis eu volutpat.' },
            { title:'Lorem Ipsum' , content:'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.' },
            { title:'Lorem Ipsum 2' , content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique. Velit dignissim sodales ut eu sem. Dui vivamus arcu felis bibendum. Aenean et tortor at risus viverra adipiscing at.' },
            { title:'Lorem Ipsum 3' , content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. In eu mi bibendum neque egestas congue quisque. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Quam viverra orci sagittis eu volutpat.' },
            { title:'Lorem Ipsum' , content:'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.' },
            { title:'Lorem Ipsum 2' , content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique. Velit dignissim sodales ut eu sem. Dui vivamus arcu felis bibendum. Aenean et tortor at risus viverra adipiscing at.' },
            { title:'Lorem Ipsum 3' , content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. In eu mi bibendum neque egestas congue quisque. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Quam viverra orci sagittis eu volutpat.' },
            { title:'Lorem Ipsum' , content:'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.' },
            { title:'Lorem Ipsum 2' , content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique. Velit dignissim sodales ut eu sem. Dui vivamus arcu felis bibendum. Aenean et tortor at risus viverra adipiscing at.' },
            { title:'Lorem Ipsum 3' , content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. In eu mi bibendum neque egestas congue quisque. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Quam viverra orci sagittis eu volutpat.' },
            { title:'Lorem Ipsum' , content:'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.' },
            { title:'Lorem Ipsum 2' , content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique. Velit dignissim sodales ut eu sem. Dui vivamus arcu felis bibendum. Aenean et tortor at risus viverra adipiscing at.' },
            { title:'Lorem Ipsum 3' , content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. In eu mi bibendum neque egestas congue quisque. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Quam viverra orci sagittis eu volutpat.' },
            { title:'Lorem Ipsum' , content:'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.' },
            { title:'Lorem Ipsum 2' , content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu felis bibendum ut tristique. Velit dignissim sodales ut eu sem. Dui vivamus arcu felis bibendum. Aenean et tortor at risus viverra adipiscing at.' },
            { title:'Lorem Ipsum 3' , content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. In eu mi bibendum neque egestas congue quisque. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Quam viverra orci sagittis eu volutpat.' },
        ]);
        
        // fix auto incremenet in postgresql table
        await knex.raw(`
            SELECT substring(column_default, '''(.*)''') , column_name , table_schema || '.' || table_name 
                    ,reset_sequence(table_schema || '.' || table_name , column_name, substring(column_default, '''(.*)''') ) 
            FROM information_schema.columns where column_default like 'nextval%'
        `)
    }
    
};
