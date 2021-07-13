<template>
    <div class="user-profile">
        <div class="user-profile_sidebar">
            <div class="user-profile_user-panel">
                <h1 class="user-profile_username">@{{ state.user.username }}</h1>
                <!--<h2>{{ userId }}</h2>-->
                <div class="user-profile_admin-badge" v-if="state.user.isAdmin">
                    Admin
                </div>
                <div class="user-profile_follower-count">
                    <strong>Followers: </strong>{{ state.followers }}
                </div>
            </div>
            <CreateTwootPanel  @add-twoot="addTwoot" />
        </div>
        <div class="user-profile_twoots-wrapper">
              <TwootItem 
                v-for="twoot in state.user.twoots" 
                :key="twoot.id" 
                :username="state.user.username" 
                :twoot="twoot" 
            />
        </div>
    </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router'; //gives a route object that can be a reference query
import { users } from '@/assets/users';
import TwootItem from "@/components/TwootItem";
import CreateTwootPanel from "@/components/CreateTwootPanel" 

export default {
    name: "UserProfile",
    components:{
        CreateTwootPanel,
        TwootItem        
    },
    setup(){
        const route = useRoute();
        const userId = computed(() => route.params.userId) //makes it adapting and changing depending on what URL we are on

        const state = reactive({
            followers: 0,
            user: users[userId.value - 1] || users[0] //user .value to reference a computed value
        })
        function addTwoot(twoot){
            state.user.twoots.unshift({ id:state.user.twoots.length + 1, content: twoot})
        }

        return {
            state,
            addTwoot,
            userId

        }
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
