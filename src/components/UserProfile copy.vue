<template>
    <div class="user-profile">
        <div class="user-profile_user-panel">
            <h1 class="user-profile_username">@{{ user.username }}</h1>
            <div class="user-profile_admin-badge" v-if="user.isAdmin"> <!-- if statement -->
                Admin
            </div>
            <div class="user-profile_follower-count"><br/>
                <strong>Followers: </strong> {{ followers }}
            </div>
            <form action="" class="user-profile_create-twoot" @submit.prevent="createNewTwoot" :class="{ '--exceeded': newTwootCharacterCount > 180 }">
                <!--  '--exceeded' class only appears if the condition newTwootCharacterCount is > (greater than) 180 is met --->
                <label for="newTwoot"><strong>New Twoot</strong>({{ newTwootCharacterCount}}/180)</label>
                <textarea name="" id="newTwoot" v-model="newTwootContent" rows="4"></textarea> <!-- v-model saves the 
                                                                                                content of the textArea
                                                                                                to the newTwootContent
                                                                                                like a signal "onTextChange"
                                                                                                in pyqt -->

                <div class="user-profile_create-twoot-type">
                    <label for="newTwootType"><strong>Type</strong></label>
                    <select name="" id="newTwootType" v-model="selectedTwootType">
                        <option :value="option.value" v-for="(option, index) in twootTypes" :key="index">
                            {{ option.name }}
                        </option>
                    </select>
                </div>
                <button>
                    Twoot!
                </button>
            </form>
            
        </div>
        <div class="user-profile_twoots-wrapper">
            <!--<div class="user-profile_twoot" v-for="twoot in user.twoots" :key="twoot.id"> loop through data 
                {{ twoot.content }}
            </div>-->
            <TwootItem 
                v-for="twoot in user.twoots" 
                :key="twoot.id" 
                :username="user.username" 
                :twoot="twoot" 
                @favourite="toggleFavourite" 
            />
        </div>
    </div>
</template>

<script>
import TwootItem from "./TwootItem"

export default {
    name: "UserProfile",
    components:{
        TwootItem
    },
    //
    data () { //data to be used by the component
        return {
            newTwootContent: '',
            selectedTwootType: 'instant',
            twootTypes: [
                { value: "draft",name:'Draft' },
                { value: "instant",name:'Instant Twoot' }
            ],
            followers: 0,
            user: {
            id: 1,
            username: '_oswng07',
            firstName: 'oswng',
            lastName: 'iloy',
            email: 'oswng@demo.com',
            isAdmin: true,
            twoots: [
                { id:1, content:'Twotter is Amazing' },
                { id:2, content:"Twoot 2" }
            ]
            }
        }
    },
    //
    watch: {
        followers(newFollowerCount, oldFollowerCount) { // watches if a part of the component is changed then runs a function
        //console.log(newFollowerCount + ' ' + oldFollowerCount)
        if (oldFollowerCount < newFollowerCount){
            console.log(`${this.user.username} has gained a follower`)
        }
        }
    },

    //
    computed: { //Dynamicaly update if a widget is changed
        // fullName() {
        // return `${this.user.firstName} ${this.user.lastName}`
        // }

        newTwootCharacterCount(){ //the widget refered is the twoot input field
            return this.newTwootContent.length;
        }

    },

    //
    methods: { //functions for the component
        followUser() {
        this.followers++
        },

        toggleFavourite (id){
            console.log(`Favourite twoot #${id} `)
        },
        createNewTwoot(){
            if (this.newTwootContent && this.selectedTwootType !== 'draft'){
                this.user.twoots.unshift( { //unshift appends content to the array to the top of the array while push is the contrary
                    id:this.user.twoots.length + 1,
                    content: this.newTwootContent
                })
                console.log({
                username: this.user.username,
                twoot_id: this.user.twoots[0].id,
                twoot: this.user.twoots[0].content
                })
            }
            this.newTwootContent = ''
            
        }  
    },
        
    //
    mounted () { // runs the function the moment the component is ran
        this.followUser();
    }

    

}
</script>

<style lang="scss" scoped>
.user-profile { 
    display: grid;
    grid-template-columns:1fr 3fr;
    padding:50px 5%;
    grid-gap:50px;

    .user-profile_user-panel {
    display: flex;
    flex-direction:column;
    padding:20px;
    background-color: white;
    border-radius:5px;
    border: 1px solid #DFE3E8;
    margin-bottom:auto;
    }

h1{
    margin:0;
}


.user-profile_admin-badge {
    background: rebeccapurple;
    color: white;
    border-radius:5px;
    margin-right:auto;
    padding:0 10px;
    font-weight: bold;
    
    }

.user-profile_twoots-wrapper{
    display:grid;
    grid-gap:10px;
    margin-bottom: auto;
}
    
.user-profile_create-twoot{
    padding-top:20px;
    display:flex;
    flex-direction:column;

    &.--exceeded {
        color:red;
        border-color:red;

        textarea {
            border:1px solid red;
        }

        button {
            background:red;
            border:none;
            color:white;
        }
        }   
    }


}





</style>
